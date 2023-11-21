import { Router, useRouter } from 'expo-router'
import { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { UserContext } from '@/states/UserProviders'
import { isLogged } from '@/utils/is-logged'

export function TabCameraButton() {
  const router: Router = useRouter()
  const { authenticatedUser } = useContext(UserContext)

  const openCameraHandler = () => {
    isLogged(
      authenticatedUser,
      () => router.push('/video/camera'),
      () => router.replace('/account/sign-in/'),
    )
  }

  return (
    <TouchableOpacity
      onPress={openCameraHandler}
      className="absolute right-8 bottom-8 z-20 bg-red-500 p-4 rounded-3xl">
      <Icon color="white" name="video" size={34} />
    </TouchableOpacity>
  )
}
