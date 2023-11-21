import { Video, ResizeMode } from 'expo-av'
import { MutableRefObject, useContext, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import IconHeart from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Feather'

import { FeedItem } from '@/models/feed'
import { User } from '@/models/user'
import { UserContext } from '@/states/UserProviders'
import { Router, useRouter } from 'expo-router'
import { isLogged } from '@/utils/is-logged'

interface UserInfoProps {
  user: User
  following?: boolean
  followAction: () => void
}
function UserInfo({ user, following, followAction }: UserInfoProps) {
  return (
    <View className="absolute z-30 flex-row items-center flex-1 rounded-full m-3 py-1 px-2 bg-zinc-800/60">
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
          <Text
            numberOfLines={1}
            className="font-semibold text-white text-md">{`@${user.username} - ${user.name}`}</Text>
          <Text numberOfLines={1} className="text-xs text-white">
            {user?.followers
              ? `${user?.followers} seguidores`
              : 'Seja o primeiro a seguir'}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          className="bg-white rounded-full px-2 py-1"
          onPress={followAction}>
          <Text className="font-semibold text-xs">
            {following ? 'Seguindo' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface VideoInfoProps {
  title: string
  liked?: boolean
  description: string
  likeAction: () => void
  commentAction: () => void
  shareAction: () => void
}
function VideoInfo({
  title,
  liked,
  description,
  commentAction,
  likeAction,
  shareAction,
}: VideoInfoProps) {
  return (
    <View className="absolute z-30 bottom-0 flex-row items-center flex-1 rounded-t-2xl p-3 space-x-6 bg-zinc-800/60">
      <View className="flex-1">
        <Text numberOfLines={2} className="flex-1 font-semibold text-white">
          {title}
        </Text>
        <Text numberOfLines={3} className="text-xs flex-1 text-white">
          {description}
        </Text>
      </View>
      <View className="flow flex-row space-x-3">
        <TouchableOpacity onPress={likeAction}>
          {liked ? (
            <IconHeart name="heart" color="white" size={24} />
          ) : (
            <IconHeart name="hearto" color="white" size={24} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={commentAction}>
          <Icon name="message-square" color="white" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareAction}>
          <Icon name="share" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface VideoPlayerFeedProps {
  item: FeedItem
  commentAction: (id: string) => void
  shareAction: (url: string) => void
  showDetails: (id: string, video: MutableRefObject<Video>) => void
}
export function VideoPlayerFeed({
  item: initalData,
  commentAction,
  shareAction,
  showDetails,
}: VideoPlayerFeedProps) {
  const router: Router = useRouter()
  const video: MutableRefObject<Video> = useRef(null)
  const { authenticatedUser } = useContext(UserContext)
  const [item, setItem] = useState<FeedItem>(initalData)

  const followActionHandler = (id: string) => {
    isLogged(
      authenticatedUser,
      () =>
        setItem((current: FeedItem) => ({
          ...current,
          following: !current.following,
        })),
      () => router.replace('/account/sign-in/'),
    )
  }

  const likeActionHandler = (id: string) => {
    isLogged(
      authenticatedUser,
      () => setItem((current: FeedItem) => ({ ...current, liked: !current.liked })),
      () => router.replace('/account/sign-in/'),
    )
  }

  return (
    <TouchableOpacity
      className="flex h-96 my-3 rounded-2xl overflow-hidden"
      onPress={() => showDetails(item.id, video)}>
      <UserInfo
        user={item.user}
        following={item.following}
        followAction={() => followActionHandler(item.id)}
      />
      <VideoInfo
        title={item.video.title}
        liked={item.liked}
        description={item.video.description}
        commentAction={() => commentAction(item.id)}
        shareAction={() => shareAction(item.video.uri)}
        likeAction={() => likeActionHandler(item.id)}
      />
      <Video
        ref={video}
        className="flex-1 rounded-2xl"
        source={{
          uri: item.video.uri,
        }}
        isMuted
        shouldPlay
        usePoster
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        PosterComponent={() => (
          <View className="h-96 flex">
            <ImageBackground
              className="flex-1"
              source={
                item.video.poster
                  ? { uri: item.video.poster, cache: 'force-cache' }
                  : require('../../assets/no-avatar.png')
              }
              resizeMode="cover"
            />
          </View>
        )}
      />
    </TouchableOpacity>
  )
}
