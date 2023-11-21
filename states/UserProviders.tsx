import AsyncStorage from '@react-native-async-storage/async-storage'
import { ReactNode, createContext, useState } from 'react'

import { APPKEY } from '@/constants/storage'
import { AuthenticatedUser } from '@/models/user'

interface User {
  authenticatedUser?: AuthenticatedUser
  setAuthenticatedUser: (authenticatedUser: AuthenticatedUser) => void
  unsetAuthenticatedUser: () => void
}

const initialValue: User = {
  authenticatedUser: undefined,
  setAuthenticatedUser: (user: AuthenticatedUser) => {},
  unsetAuthenticatedUser: () => {},
}

export const UserContext = createContext<User>(initialValue)

interface RecordingProviderProps {
  children: ReactNode | ReactNode[]
}
export default function RecordingProvider({
  children,
}: RecordingProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser>()

  const setAuthenticatedUser = async (user: AuthenticatedUser) => {
    try {
      setUser(user)
      if (!user) return
      await AsyncStorage.setItem(APPKEY, JSON.stringify(user))
    } catch (error: any | Error) {
      console.error('E372d7f41', error)
    }
  }

  const unsetAuthenticatedUser = async () => {
    try {
      await AsyncStorage.removeItem(APPKEY)
      setUser(undefined)
    } catch (error: any | Error) {
      console.error('E37b0eb31', error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        authenticatedUser: user,
        setAuthenticatedUser,
        unsetAuthenticatedUser,
      }}>
      {children}
    </UserContext.Provider>
  )
}
