import { Router, useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { SafeAreaView, FlatList, Alert } from 'react-native'

import { LoadingListMessage } from '@/components/core/LoadingListMessage'
import { VideoPlayerLikes } from '@/components/video/VideoPlayerLikes'
import { FeedItem } from '@/models/feed'
import { fetchFeedDataService } from '@/services/fetch-feed-data'
import { ContentContext } from '@/states/ContentProvider'

export default function Feed() {
  const router: Router = useRouter()
  const { liked, appendLikedItems } = useContext(ContentContext)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchDataHandler = async () => {
    try {
      if (isLoading) return null
      setIsLoading(true)
      const items: FeedItem[] = await fetchFeedDataService(currentPage)
      appendLikedItems(items)
      setCurrentPage((current: number): number => current + 1)
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao carregar lista',
        'Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.',
      )
      console.error('Ecdd52901', error)
    } finally {
      setIsLoading(false)
    }
  }

  const showDetailsHandler = (id: string) => {
    router.push(`/video/details/${id}/`)
  }

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="px-6"
        data={liked}
        numColumns={2}
        keyExtractor={({ id }: FeedItem, index: number) =>
          `${index}${id}${Math.random()}`
        }
        onEndReached={fetchDataHandler}
        onEndReachedThreshold={0.1}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <VideoPlayerLikes {...item} showDetails={showDetailsHandler} />
        )}
        ListFooterComponent={
          <LoadingListMessage text="Buscando mais vídeos.." />
        }
      />
    </SafeAreaView>
  )
}
