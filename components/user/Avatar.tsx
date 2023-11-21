import { ImageBackground, TouchableOpacity } from 'react-native'

interface AvatarProps {
  uri?: string
  changeAvatar: () => void
}
export function Avatar({ changeAvatar, uri }: AvatarProps) {
  return (
    <TouchableOpacity
      className="flex h-32 w-32 rounded-full overflow-hidden"
      onPress={changeAvatar}>
      <ImageBackground
        className="flex-1"
        source={
          uri
            ? {
                uri,
                cache: 'force-cache',
              }
            : require('../../assets/no-avatar.png')
        }
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}
