import { AxiosResponse } from 'axios'

import { api } from './api'

import { Comment } from '@/models/comment'

export async function fetchCommentsDataService(
  userID: string,
): Promise<Comment[]> {
  try {
    const response: AxiosResponse<Comment[]> = await api.get(
      `/comments/${userID}`,
    )
    return response.data
  } catch (error: any | Error) {
    console.error('E5f04799b', error)
  }
}
