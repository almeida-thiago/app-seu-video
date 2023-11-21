import { AxiosStatic } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import authenticatedUser from './authenticated-user.json'
import comments from './comments.json'
import videos from './videos.json'

import { API_URL } from '@/constants/api'

export function mock(axios: AxiosStatic): AxiosStatic {
  const mock = new MockAdapter(axios)

  mock.onGet(`${API_URL}/videos`).reply(200, videos)
  mock
    .onGet(`${API_URL}/videos/a3dd9301-1155-4891-9755-6381a496f4da`)
    .reply(200, videos[0])
  mock
    .onGet(`${API_URL}/videos/a3dd9301-1155-4891-9755-63812496f4ca`)
    .reply(200, videos[1])
  mock
    .onGet(`${API_URL}/videos/a3dd9301-11f5-4891-9755-6381a496f4ca`)
    .reply(200, videos[2])
  mock
    .onGet(`${API_URL}/videos/a3dd9301-1155-4891-9755-6381a496s4ca`)
    .reply(200, videos[3])
  mock
    .onGet(`${API_URL}/videos/a3dd9301-1155-4891-97c5-6381a496f4ca`)
    .reply(200, videos[4])
  mock.onGet(`${API_URL}/comments/robbyOne`).reply(200, comments)
  mock.onPut(`${API_URL}/profile/robbyOne`).reply(200, authenticatedUser)
  mock.onPost(`${API_URL}/sign-up`).reply(201, authenticatedUser)
  mock.onPost(`${API_URL}/sign-in`).reply(200, authenticatedUser)
  mock.onPost(`${API_URL}/videos`).reply(200)
  return axios
}
