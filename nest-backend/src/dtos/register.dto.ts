import { IsEmail, IsNotEmpty, IsNotIn, Matches, MaxLength, MinLength } from 'class-validator'

export class RegisterDTO {
  @Matches(new RegExp('^[a-zA-Z0-9_.-]*$'), {
    message: 'Invalid characters in username'
  })
  @MinLength(4, {
    message: 'Username is too short'
  })
  username: string

  @IsEmail()
  email: string

  @MinLength(8, {
    message: 'Must be between 8 and 20 characters long'
  })
  @MaxLength(20, {
    message: 'Must be between 8 and 20 characters long'
  })
  @Matches(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9])'), {
    message: 'Password must contain at least one  lowercase, uppercase and alphanumeric character'
  })
  password: string

  @IsNotEmpty()
  captcha: string
}
