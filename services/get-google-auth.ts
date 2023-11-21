import axios, { AxiosResponse } from 'axios'

export async function getGoogleAuth(token: string): Promise<any> {
  try {
    if (!token || !token.length) throw new Error('token not provided')
    const response: AxiosResponse<any> = await axios.get(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error: any | Error) {
    console.error('Eacc964df', error)
  }
}
