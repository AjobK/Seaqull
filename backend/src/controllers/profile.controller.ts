import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Ip,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ProfileService } from '../services/profile.service'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'
import { AllowAny } from '../decorators/allow-any.decorator'
import { RegisterDTO } from '../dtos/register.dto'
import { FollowDTO } from '../dtos/response/follow.dto'
import { ProfileAvatarDTO } from '../dtos/response/profile-avatar.dto'
import { CaptchaService } from '../services/captcha.service'
import { ProfileUpdateDTO } from '../dtos/profile-update.dto'
import { RegisterPayloadDTO } from '../dtos/register-payload.dto'

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
    private readonly captchaService: CaptchaService,
  ) {}

  @Get()
  public async getOwnProfile(
    @AuthorizedUser() user: Account
  ): Promise<any> {
    const profile = await this.profileService.getProfile(user.user_name, undefined)

    return profile
  }

  @Get('/:username')
  @AllowAny()
  public async getProfile(
    @Param('username') username: string,
    @AuthorizedUser() user: Account
  ): Promise<any> {
    const profile = await this.profileService.getProfile(username, user)

    return profile
  }

  @Get('/:username/followers')
  @AllowAny()
  public async getFollowers(@Param('username') username: string): Promise<{ followers: number[] }> {
    const followers = await this.profileService.getFollowers(username)

    return {
      followers
    }
  }

  @Post('/register')
  @AllowAny()
  public async register(
    @Body() registerDTO: RegisterDTO,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const isValidCaptcha = await this.captchaService.verifyHCaptcha(registerDTO.captcha)

    if (!isValidCaptcha) throw new ForbiddenException('We could not verify that you are not a robot')

    const payload = await this.profileService.register(registerDTO, ip)

    // res.setHeader(
    //   'Set-Cookie',
    //   `token=${ payload.token }; HttpOnly; ${
    //     this.configService.get('SECURE') == 'true' ? 'secure;' : ''
    //   } expires=${ +new Date(new Date().getTime() + 86409000).toUTCString() }; path=/`
    // )

    const publicPayload: RegisterPayloadDTO = {
      verificationUrl: payload.verificationUrl,
      email: payload.email,
    }

    res.status(200).json({
      user: publicPayload
    })

    res.send()
  }

  @Post('/follow/:username')
  public async follow(@AuthorizedUser() user: Account, @Param('username') username: string): Promise<FollowDTO> {
    const hasFollowedProfile = await this.profileService.follow(user.profile, username)

    return {
      message: `Successfully ${ hasFollowedProfile ? '' : 'un' }followed profile`,
      following: hasFollowedProfile,
    }
  }

  @Put()
  public async updateProfile(
    @AuthorizedUser() user: Account,
    @Body() profileUpdateDTO: ProfileUpdateDTO,
  ): Promise<string> {
    if (user.user_name !== profileUpdateDTO.username) {
      throw new UnauthorizedException('Cannot update another users profile')
    }

    await this.profileService.updateProfile(profileUpdateDTO)

    return 'Success'
  }

  @Put('/avatar')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fieldSize: 2 * 1024 * 1024 },
  }))
  public async updateProfileAvatar(
    @UploadedFile() file: Express.Multer.File,
    @AuthorizedUser() user: Account,
  ): Promise<ProfileAvatarDTO> {
    const avatar = await this.profileService.updateProfileAvatar(file, user.user_name)

    return {
      message: 'success',
      url: `${ this.configService.get('BACKEND_URL') }/${ avatar.path }`
    }
  }

  @Put('/banner')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fieldSize: 2 * 1024 * 1024 },
  }))
  public async updateProfileBanner(
    @UploadedFile() file: Express.Multer.File,
    @AuthorizedUser() user: Account,
  ): Promise<ProfileAvatarDTO> {
    const banner = await this.profileService.updateProfileBanner(file, user.user_name)

    return {
      message: 'success',
      url: `${ this.configService.get('BACKEND_URL') }/${ banner.path }`
    }
  }
}
