import { User } from '@/models/user'
import { Video } from '@/models/video'

export interface FeedItem {
  id: string
  user: User
  video: Video
  liked?: boolean
  following?: boolean
}
