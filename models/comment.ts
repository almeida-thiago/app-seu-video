import { User } from '@/models/user'

export interface Comment {
  id?: string
  user: User
  date: Date
  text: string
}
