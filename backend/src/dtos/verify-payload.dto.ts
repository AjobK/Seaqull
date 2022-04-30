import { Profile } from '../entities/profile.entity'
import { Role } from '../entities/role.entity'

export class VerifyPayloadDTO {
  role: Role

  profile: Profile

  username: string

  email: string

  token?: string
}
