import { AxiosResponse } from 'axios'

import { api } from './api'

import { FeedItem } from '@/models/feed'

export async function fetchDetailsService(id: string): Promise<FeedItem> {
  try {
    const response: AxiosResponse<FeedItem> = await api.get(`/videos/${id}`)
    return response.data
  } catch (error: any | Error) {
    console.error('E877a2ef0', error)
  }
}
