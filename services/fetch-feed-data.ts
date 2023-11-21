import { AxiosResponse } from 'axios'

import { api } from './api'

import { FeedItem } from '@/models/feed'

export async function fetchFeedDataService(page: number): Promise<FeedItem[]> {
  try {
    const params = {
      page,
      offset: 5,
    }
    const response: AxiosResponse<FeedItem[]> = await api.get('/videos', {
      params,
    })
    return response.data
  } catch (error: any | Error) {
    console.error('E877a2ef0', error)
  }
}
