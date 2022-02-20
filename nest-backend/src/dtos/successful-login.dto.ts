import { Account } from '../entities/account.entity'
import { IsNotEmpty } from 'class-validator'

export class SuccessfulLoginDTO {
  @IsNotEmpty()
  token: string

  account: Account
}
