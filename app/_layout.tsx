import Feather from '@expo/vector-icons/Feather'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { Appearance, LogBox } from 'react-native'

import { SCREENS } from '@/constants/pages'
import { Screens } from '@/models/core'
import { AuthenticatedUser } from '@/models/user'
import { verifySession } from '@/security/verify-session'
import Providers from '@/states/Providers'
import { UserContext } from '@/states/UserProviders'
export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()
LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function RootLayout() {
  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  )
}

function RootLayoutNav() {
  const { setAuthenticatedUser } = useContext(UserContext)
  const [loaded, error] = useFonts({
    ...Feather.font,
  })

  useEffect(() => {
    if (error) throw error
    Appearance.setColorScheme('light')
  }, [error])

  useEffect(() => {
    verifySession().then((user: AuthenticatedUser) => {
      setAuthenticatedUser(user)
      if (loaded) {
        SplashScreen.hideAsync()
      }
    })
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      {SCREENS.map(({ headerShown, link, presentation }: Screens) => (
        <Stack.Screen name={link} options={{ headerShown, presentation }} />
      ))}
    </Stack>
  )
}
