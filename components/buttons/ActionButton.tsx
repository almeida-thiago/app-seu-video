import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface ActionButtonProps {
  children: string
  isDisabled?: boolean
  onPress: (event: GestureResponderEvent) => void
}
export function ActionButton({
  children,
  onPress,
  isDisabled,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      className="bg-red-500 px-4 py-2 flex flex-row space-x-3 justify-center items-center rounded-3xl"
      onPress={onPress}
      disabled={isDisabled}>
      <Icon color="white" name="video" size={24} />
      <Text className="text-xl font-semibold text-white">{children}</Text>
    </TouchableOpacity>
  )
}
