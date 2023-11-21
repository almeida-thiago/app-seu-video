import { Video } from '@/models/video'
import { User } from '@/models/user'

export interface UploadVideo extends Video {
  user: User
  uri: string
  poster: string
  title: string
  description: string
}

export interface UploadData {
  base64: string
  poster: string
  title: string
  description: string
}
