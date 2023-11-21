import { Video } from 'expo-av'
import { Router, useRouter } from 'expo-router'
import { MutableRefObject, useContext, useState } from 'react'
import { SafeAreaView, FlatList, Alert } from 'react-native'

import { LoadingListMessage } from '@/components/core/LoadingListMessage'
import { VideoPlayerFeed } from '@/components/video/VideoPlayerFeed'
import { FeedItem } from '@/models/feed'
import { fetchFeedDataService } from '@/services/fetch-feed-data'
import { shareService } from '@/services/share'
import { ContentContext } from '@/states/ContentProvider'
import { UserContext } from '@/states/UserProviders'
import { isLogged } from '@/utils/is-logged'

export default function Feed() {
  const router: Router = useRouter()
  const { feed, appendFeedItem } = useContext(ContentContext)
  const { authenticatedUser } = useContext(UserContext)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchDataHandler = async () => {
    try {
      if (isLoading) return null
      setIsLoading(true)
      const items: FeedItem[] = await fetchFeedDataService(currentPage)
      appendFeedItem(items)
      setCurrentPage((current: number): number => current + 1)
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao carregar feed',
        'Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.',
      )
      console.error('Ecdd52901', error)
    } finally {
      setIsLoading(false)
    }
  }

  const commentActionHandler = (id: string) => {
    isLogged(
      authenticatedUser,
      () => router.push(`/video/details/${id}/`),
      () => router.replace('/account/sign-in/'),
    )
  }

  const shareActionHandler = async (uri: string) => {
    try {
      await shareService(uri)
    } catch (error) {
      Alert.alert(
        'Erro ao compartilhar vídeo',
        'Ocorreu um erro ao compartilhar o vídeo. Por favor, tente novamente mais tarde.',
      )
      console.error('Ec836e4c5', error)
    }
  }

  const showDetailsHandler = (id: string, video: MutableRefObject<Video>) => {
    video.current.stopAsync()
    router.push(`/video/details/${id}/`)
  }

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="px-6 pt-3"
        data={feed}
        keyExtractor={({ id }: FeedItem, index: number) =>
          `${index}${id}${Math.random()}`
        }
        onEndReached={fetchDataHandler}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <VideoPlayerFeed
            item={item}
            commentAction={commentActionHandler}
            shareAction={shareActionHandler}
            showDetails={showDetailsHandler}
          />
        )}
        ListFooterComponent={
          <LoadingListMessage text="Buscando mais vídeos.." />
        }
      />
    </SafeAreaView>
  )
}
