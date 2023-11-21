import { AxiosResponse } from 'axios'

import { api } from './api'

import { AuthenticatedUser, User } from '@/models/user'

export async function updateProfile(
  data: AuthenticatedUser,
): Promise<AuthenticatedUser> {
  try {
    const body: User = { ...data }
    const response: AxiosResponse<User> = await api.put(
      `/profile/${data.username}`,
      body,
    )
    return { ...response.data, ...data }
  } catch (error: any | Error) {
    console.error('E877a2ef0', error)
  }
}
