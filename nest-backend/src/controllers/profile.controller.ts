import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ProfileService } from '../services/profile.service'
import { AuthGuard } from '@nestjs/passport'
import Title from '../../../backend/app/entities/title'
import ProfileFollowedBy from '../../../backend/app/entities/profile_followed_by'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  public async getProfile(@Param('username') username: string): any {
    const profile = await this.profileService.getProfile(username)
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
