import { Profile } from '../entities/profile.entity'
import { Role } from '../entities/role.entity'

export class RegisterPayloadDTO {
  role: Role

  profile: Profile

  username: string

  email: string

  token?: string
}
