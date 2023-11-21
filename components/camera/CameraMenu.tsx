import { TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'

interface CameraMenuProps {
  isLightActive: boolean
  isRecording: boolean
  toggleCamera: () => void
  toggleLight: () => void
  stopRecording: () => void
  startRecording: () => void
  findInMediaLibrary: () => void
  cancel: () => void
}
export function CameraMenu({
  isLightActive,
  isRecording,
  toggleCamera,
  toggleLight,
  startRecording,
  stopRecording,
  findInMediaLibrary,
  cancel,
}: CameraMenuProps) {
  return (
    <SafeAreaView className="flex items-center justify-center py-3">
      <View className="bg-zinc-800/60 flex flex-row items-center justify-center space-x-10 px-8 py-4 rounded-2xl">
        <TouchableOpacity onPress={findInMediaLibrary} disabled={isRecording}>
          <Icon color="white" name="upload" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCamera} disabled={isRecording}>
          <Icon color="white" name="refresh-cw" size={24} />
        </TouchableOpacity>
        {isRecording ? (
          <TouchableOpacity
            className="bg-white w-12 h-12 rounded-sm border-spacing-3 border-white border-solid border-2"
            onPress={stopRecording}
          />
        ) : (
          <TouchableOpacity
            className="bg-red-600 w-12 h-12 rounded-full border-spacing-3 border-white border-solid border-2"
            onPress={startRecording}
          />
        )}
        <TouchableOpacity onPress={toggleLight}>
          <Icon
            color="white"
            name={isLightActive ? 'zap-off' : 'zap'}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={cancel}>
          <Icon color="white" name="x" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
