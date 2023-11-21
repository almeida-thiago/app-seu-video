import { AxiosResponse } from 'axios'

import { AuthenticatedUser, UserSignIn } from '@/models/user'
import { api } from '@/services/api'

export async function signInService(
  data: UserSignIn,
): Promise<AuthenticatedUser> {
  try {
    const body: UserSignIn = data
    const response: AxiosResponse<AuthenticatedUser> = await api.post(
      '/sign-in',
      body,
    )
    return response.data
  } catch (error: any | Error) {
    console.error('Eaf5c5083', error)
  }
}
