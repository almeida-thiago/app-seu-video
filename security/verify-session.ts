import AsyncStorage from '@react-native-async-storage/async-storage'

import { APPKEY } from '@/constants/storage'
import { AuthenticatedUser } from '@/models/user'

export async function verifySession(): Promise<AuthenticatedUser | undefined> {
  try {
    const hasData: string = await AsyncStorage.getItem(APPKEY)
    if (!hasData) return undefined
    const authenticatedUser: AuthenticatedUser = JSON.parse(hasData)
    return authenticatedUser
  } catch (erro: any | Error) {
    console.error('E11c423d2', erro)
    return undefined
  }
}
