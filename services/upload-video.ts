import { AxiosResponse } from 'axios'
import * as FileSystem from 'expo-file-system'

import { api } from './api'

import { FeedItem } from '@/models/feed'
import { UploadData, UploadVideo } from '@/models/upload'

export async function uploadVideoService(data: UploadVideo): Promise<FeedItem> {
  try {
    const body: UploadData = {
      ...data,
      base64: await FileSystem.readAsStringAsync(data.uri, {
        encoding: 'base64',
      }),
    }
    const response: AxiosResponse<FeedItem> = await api.post('/videos', body)
    return response.data
  } catch (error: any | Error) {
    console.error('E877a2ef0', error)
  }
}
