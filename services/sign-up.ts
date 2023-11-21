import { AxiosResponse } from 'axios'

import { api } from './api'

import { AuthenticatedUser, UserSignUp } from '@/models/user'

export async function signUpService(
  data: UserSignUp,
): Promise<AuthenticatedUser> {
  try {
    const body: UserSignUp = data
    const response: AxiosResponse<AuthenticatedUser> = await api.post(
      '/sign-up',
      body,
    )
    return response.data
  } catch (error: any | Error) {
    console.error('E86717ef5', error)
  }
}
