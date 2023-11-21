import { Router, useRouter } from 'expo-router'
import { useContext } from 'react'
import { Platform, SafeAreaView, StatusBar } from 'react-native'

import Header from '@/features/Header'
import Messages from '@/features/Messages'
import { UserContext } from '@/states/UserProviders'
import { isLogged } from '@/utils/is-logged'

export default function MessagesScreen() {
  const router: Router = useRouter()
  const { authenticatedUser } = useContext(UserContext)

  isLogged(authenticatedUser, undefined, () =>
    router.replace('/account/sign-in/'),
  )

  return (
    <>
      <SafeAreaView
        className="bg-red-500 rounded-b-3xl"
        style={{
          paddingTop:
            Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 0,
        }}>
        <StatusBar barStyle="light-content" />
        <Header title="Seus comentários!" />
      </SafeAreaView>
      <Messages />
    </>
  )
}
