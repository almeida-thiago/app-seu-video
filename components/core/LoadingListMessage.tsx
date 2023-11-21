import { ActivityIndicator, View, Text } from 'react-native'

interface LoadingListMessageProps {
  text: string
}
export function LoadingListMessage({ text }: LoadingListMessageProps) {
  return (
    <View className="flex justify-center space-x-3 flex-row items-center p-6 mb-6">
      <ActivityIndicator color="black" size="small" className="fill-zinc-700" />
      <Text className="text-zinc-700">{text}</Text>
    </View>
  )
}
