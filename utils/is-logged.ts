import { AuthenticatedUser } from '@/models/user'

export function isLogged(
  user: AuthenticatedUser,
  isLogged?: () => void,
  isNotLogged?: () => void,
) {
  if (!user && isNotLogged) {
    isNotLogged()
    return null
  }
  if (user && isLogged) {
    isLogged()
    return null
  }
}
