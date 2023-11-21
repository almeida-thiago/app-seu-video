import { Link } from 'expo-router'
import { View, Text } from 'react-native'

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center px-6 space-y-6 items-center">
      <Text className="text-xl text-center leading-6">
        Precisamos da sua permissão para acessar a câmera e liberar todos os
        recursos do aplicativo.
      </Text>
      <Link
        href="/(home)/feed"
        className="bg-red-500 px-4 py-2 flex flex-row space-x-3 justify-center items-center self-center rounded-3xl">
        <Text className="text-xl font-semibold text-white">Voltar</Text>
      </Link>
    </View>
  )
}
