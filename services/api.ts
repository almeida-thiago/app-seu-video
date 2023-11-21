import axios, { AxiosInstance } from 'axios'

import { API_URL } from '@/constants/api'
import { mock } from '@/services/_mock'

export const api: AxiosInstance = mock(axios).create({
  baseURL: API_URL,
})
