import {Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common'
import { ProfileService } from '../services/profile.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  public getProfile(): any {

  }

  @Get('/:username/followers')
  public async getFollowers(@Param('username') username: string): Promise<{ followers: number[] }> {
    const followers = await this.profileService.getFollowers(username)

    return {
      followers
    }
  }

  @Post('/register')
  public register(): any {

  }

  @Post('/follow/:username')
  public follow(): any {

  }

  @Put('/avatar')
  @UseGuards(AuthGuard())
  public updateProfileAvatar(): any {

  }

  @Put('/banner')
  @UseGuards(AuthGuard())
  public updateProfileBanner(): any {

  }
}
