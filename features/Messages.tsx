import { useContext, useEffect, useState } from 'react'
import { SafeAreaView, FlatList, Alert } from 'react-native'

import { CommentItem } from '@/components/comment/CommentItem'
import { Comment } from '@/models/comment'
import { fetchCommentsDataService } from '@/services/fetch-comments-data'
import { UserContext } from '@/states/UserProviders'

export default function Feed() {
  const { authenticatedUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [items, setItems] = useState<Comment[]>([])

  const fetchDataHandler = async () => {
    try {
      if (isLoading) return null
      setIsLoading(true)
      const comments: Comment[] = await fetchCommentsDataService(
        authenticatedUser.username,
      )
      setItems(comments)
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao carregar os comentários',
        'Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.',
      )
      console.error('Ecdd52901', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDataHandler()
  }, [])

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="h-1/5 p-6"
        data={items}
        keyExtractor={({ id }: Comment) => id}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => <CommentItem {...item} />}
      />
    </SafeAreaView>
  )
}
