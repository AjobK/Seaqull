import { IsNotEmpty } from 'class-validator'

export class CreatePostDTO {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  content: string
}
