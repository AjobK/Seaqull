import { IsNotEmpty } from 'class-validator'

export class CreatePostDTO {
  @IsNotEmpty()
  title: string

  description: string

  @IsNotEmpty()
  content: string
}
