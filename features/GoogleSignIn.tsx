import { AuthSessionResult } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { useContext, useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import { ANDROID, IOS } from '@/constants/oauth'
import { getGoogleAuth } from '@/services/get-google-auth'
import { UserContext } from '@/states/UserProviders'

export function GoogleSignIn() {
  WebBrowser.maybeCompleteAuthSession()
  const { authenticatedUser } = useContext(UserContext)
  const [req, res, openBrowser] = Google.useAuthRequest({
    androidClientId: ANDROID,
    iosClientId: IOS,
  })

  const openBrowserHandler = () => {
    openBrowser()
  }

  const fetchGoogleData = async (res: AuthSessionResult) => {
    try {
      if (res && res?.type === 'success') {
        getGoogleAuth(res?.authentication?.accessToken)
      }
    } catch (error: any | Error) {
      console.error('E69b6627f', error)
    }
  }

  useEffect(() => {
    fetchGoogleData(res)
  }, [res])

  return (
    <TouchableOpacity
      className="bg-zinc-200 px-4 py-2 flex flex-row space-x-3 justify-center items-center self-center rounded-3xl"
      onPress={openBrowserHandler}>
      <Icon name="google" size={24} />
      <Text>Entrar com o Google</Text>
    </TouchableOpacity>
  )
}
