import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'

import { FeedItem } from '@/models/feed'
import { User } from '@/models/user'

interface UserInfoProps {
  user: User
}
function UserInfo({ user }: UserInfoProps) {
  return (
    <View className="flex items-center flex-row space-x-2">
      <View className="flex rounded-full h-8 w-8 overflow-hidden">
        <ImageBackground
          className="flex-1"
          source={
            user.avatar
              ? {
                  uri: user.avatar,
                  cache: 'force-cache',
                }
              : require('../../assets/no-avatar.png')
          }
          resizeMode="cover"
        />
      </View>
      <View>
        <Text numberOfLines={1} className="font-semibold text-md">
          {user.name}
        </Text>
        <Text numberOfLines={1} className="text-xs">{`@${user.username}`}</Text>
      </View>
    </View>
  )
}

interface VideoPlayerLikesProps extends FeedItem {
  showDetails: (id: string) => void
}
export function VideoPlayerLikes({
  video: videoInfo,
  user,
  id,
  showDetails,
}: VideoPlayerLikesProps) {
  return (
    <TouchableOpacity
      className="flex w-[45%] space-y-2 my-3"
      onPress={() => showDetails(id)}>
      <UserInfo user={user} />
      <View className="flex flex-1 h-44 rounded-2xl overflow-hidden">
        <ImageBackground
          className="flex-1"
          source={
            videoInfo.poster
              ? { uri: videoInfo.poster, cache: 'force-cache' }
              : require('../../assets/no-avatar.png')
          }
          resizeMode="cover"
        />
      </View>
      <View>
        <Text numberOfLines={2} className="font-semibold">
          {videoInfo.title}
        </Text>
        <Text numberOfLines={3} className="text-xs">
          {videoInfo.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
