import { Link } from 'expo-router'
import { useContext } from 'react'
import { View, Text, ImageBackground } from 'react-native'

import { UserContext } from '@/states/UserProviders'

interface HeaderProps {
  title?: string
}
export default function Header({ title }: HeaderProps) {
  const { authenticatedUser } = useContext(UserContext)

  return authenticatedUser ? (
    <View className="flex flex-row items-center justify-between space-x-3 p-6 pt-0">
      <Text className="text-white font-semibold text-2xl">
        {title || `Olá, ${authenticatedUser?.name}!`}
      </Text>
      <Link href="/user/profile/" className="active:opacity-50">
        <View className="flex rounded-full h-10 w-10 overflow-hidden">
          <ImageBackground
            className="flex-1"
            source={
              authenticatedUser.avatar
                ? {
                    uri: authenticatedUser.avatar,
                    cache: 'force-cache',
                  }
                : require('../assets/no-avatar.png')
            }
            resizeMode="cover"
          />
        </View>
      </Link>
    </View>
  ) : (
    <View className="flex flex-row items-center justify-between space-x-3 p-6 pt-0">
      <Text className="text-white font-semibold text-2xl">
        Olá! Veja as novidades.
      </Text>
      <Link href="/account/sign-in/" className="active:opacity-50">
        <View className="bg-white rounded-full px-2 py-1">
          <Text className="font-semibold">Entrar</Text>
        </View>
      </Link>
    </View>
  )
}
4
