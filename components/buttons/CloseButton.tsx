import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface CloseButtonProps {
  onClose: () => void
}
export function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <TouchableOpacity onPress={onClose}>
      <View className="bg-zinc-800/80 p-1 rounded-full flex justify-center items-center">
        <Icon color="white" name="x" size={14} />
      </View>
    </TouchableOpacity>
  )
}
