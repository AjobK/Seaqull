import { IsNotEmpty } from 'class-validator'

export class LoginDTO {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  email: string

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string

  @IsNotEmpty({ message: 'Captcha error' })
  captcha: string
}
