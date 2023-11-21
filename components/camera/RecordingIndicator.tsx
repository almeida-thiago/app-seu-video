import { View, Text } from 'react-native'

interface RecordingIndicatorProps {
  isRecording: boolean
}
export function RecordingIndicator({ isRecording }: RecordingIndicatorProps) {
  return isRecording ? (
    <View className="right-0 left-0 absolute flex justify-center items-center top-10">
      <View className="bg-zinc-800/50 p-1 rounded-lg px-3 py-2 flex flex-row justify-center items-center space-x-3">
        <View className="bg-red-500 w-3 h-3 rounded-full" />
        <Text className="text-white">Gravando</Text>
      </View>
    </View>
  ) : null
}
