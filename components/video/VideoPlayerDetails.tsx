import { Video, ResizeMode } from 'expo-av'
import { MutableRefObject, useRef } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import IconHeart from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Feather'

import { CloseButton } from '@/components/buttons/CloseButton'
import { FeedItem } from '@/models/feed'
import { User } from '@/models/user'

interface UserInfoProps {
  user: User
  following?: boolean
  followAction: () => void
  closeAction: () => void
}
function UserInfo({
  user,
  following,
  followAction,
  closeAction,
}: UserInfoProps) {
  return (
    <View className="flex-row px-3 mb-3 items-center">
      <View className="flex items-center flex-1 flex-row space-x-2">
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
          <Text className="font-semibold text-md">{`@${user.username} - ${user.name}`}</Text>
          <Text numberOfLines={1} className="text-xs">
            {user?.followers
              ? `${user?.followers} seguidores`
              : 'Seja o primeiro a seguir'}
          </Text>
        </View>
      </View>
      <View className="mr-3">
        <TouchableOpacity
          className="bg-red-500 first-line:rounded-full px-2 py-1"
          onPress={followAction}>
          <Text className="font-semibold text-white text-xs">
            {following ? 'Seguindo' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      </View>
      <CloseButton onClose={closeAction} />
    </View>
  )
}

interface VideoInfoProps {
  title: string
  liked?: boolean
  description: string
  likeAction: () => void
  shareAction: () => void
}
function VideoInfo({
  title,
  liked,
  description,
  likeAction,
  shareAction,
}: VideoInfoProps) {
  return (
    <View className="flex-row items-center p-3 space-x-6">
      <View className="flex-1 ">
        <Text className="text-xl font-semibold">{title}</Text>
        <Text>{description}</Text>
      </View>
      <View className="flow flex-row space-x-3">
        <TouchableOpacity onPress={likeAction}>
          {liked ? (
            <IconHeart name="heart" size={24} />
          ) : (
            <IconHeart name="hearto" size={24} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={shareAction}>
          <Icon name="share" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface VideoPlayerDetailsProps extends FeedItem {
  followAction: (id: string) => void
  likeAction: (id: string) => void
  closeAction: (video: MutableRefObject<Video>) => void
  shareAction: (url: string) => void
}
export function VideoPlayerDetails({
  id,
  video: videoInfo,
  liked,
  following,
  user,
  closeAction,
  followAction,
  likeAction,
  shareAction,
}: VideoPlayerDetailsProps) {
  const video: MutableRefObject<Video> = useRef(null)

  return (
    <View className="flex flex-1 my-3 overflow-hidden">
      <UserInfo
        user={user}
        following={following}
        followAction={() => followAction(id)}
        closeAction={() => closeAction(video)}
      />
      <View className="flex bg-black flex-1">
        <Video
          ref={video}
          className="flex-1"
          source={{
            uri: videoInfo.uri,
          }}
          usePoster
          useNativeControls
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          PosterComponent={() => (
            <View className="flex-1 flex">
              <ImageBackground
                className="flex-1"
                source={
                  videoInfo.poster
                    ? { uri: videoInfo.poster, cache: 'force-cache' }
                    : require('../../assets/no-avatar.png')
                }
                resizeMode="contain"
              />
            </View>
          )}
        />
      </View>
      <VideoInfo
        liked={liked}
        title={videoInfo.title}
        description={videoInfo.description}
        shareAction={() => shareAction(videoInfo.uri)}
        likeAction={() => likeAction(id)}
      />
    </View>
  )
}
