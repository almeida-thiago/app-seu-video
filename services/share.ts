import { Share } from 'react-native'

export async function shareService(url: string): Promise<void> {
  try {
    await Share.share({ url })
  } catch (error: any | Error) {
    console.error('E877a2ef0', error)
  }
}
