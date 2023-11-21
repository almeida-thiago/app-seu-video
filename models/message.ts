import { User } from '@/models/user'

export interface Message {
  user: User
  date: Date
  text: string
}
