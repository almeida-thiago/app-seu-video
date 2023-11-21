import { Comment } from '@/models/comment'

export interface Video {
  uri: string
  poster: string
  title: string
  description: string
  comments?: Comment[]
}
