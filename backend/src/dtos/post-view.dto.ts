import { Min } from 'class-validator'

export class PostViewDTO {
  @Min(0)
  views: number
}
