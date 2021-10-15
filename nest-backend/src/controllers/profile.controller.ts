import { Controller, Get, Post, Put } from '@nestjs/common'
import { ProfileService } from '../services/profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  public getProfile(): any {

  }

  @Get('/:username/followers')
  public getFollowers(): any {

  }

  @Post('/register')
  public register(): any {

  }

  @Post('/follow/:username')
  public follow(): any {

  }

  @Put('/:username')
  public updateProfile(): any {

  }

  @Put('/avatar')
  public updateProfileAvatar(): any {

  }

  @Put('/banner')
  public updateProfileBanner(): any {

  }
}
