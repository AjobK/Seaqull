import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'

export class BanUserDTO {
  @IsNotEmpty()
  username: string

  @IsInt()
  @Min(1, {
    message: 'The min amount of days you can ban a user is $constraint1 day'
  })
  @Max(1095, {
    message: 'The max amount of days you can ban a user is $constraint1 days'
  })
  days: number

  @IsNotEmpty()
  reason: string
}
