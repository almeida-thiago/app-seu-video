import { Video } from 'expo-av'
import { Router, useGlobalSearchParams, useRouter } from 'expo-router'
import { MutableRefObject, useContext, useEffect, useState } from 'react'
import { SafeAreaView, Alert, Platform, StatusBar } from 'react-native'

import { CommentsList } from '@/components/comment/CommentsList'
import { VideoPlayerDetails } from '@/components/video/VideoPlayerDetails'
import { Comment } from '@/models/comment'
import { FeedItem } from '@/models/feed'
import { fetchDetailsService } from '@/services/fetch-details'
import { shareService } from '@/services/share'
import { UserContext } from '@/states/UserProviders'

export default function VideoDetails() {
  const router: Router = useRouter()
  const glob = useGlobalSearchParams()
  const { authenticatedUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [item, setItem] = useState<FeedItem>()
  const [comments, setComments] = useState<Comment[]>([])

  const fetchDataHandler = async (id: string) => {
    try {
      if (isLoading) return null
      setIsLoading(true)
      const itemDetail: FeedItem = await fetchDetailsService(id)
      setItem(itemDetail)
      setComments(itemDetail?.video?.comments)
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao carregar o item',
        'Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.',
      )
      router.back()
      console.error('E71d5c593', error)
    } finally {
      setIsLoading(false)
    }
  }

  const followActionHandler = (id: string) => {
    setItem((current: FeedItem) => ({
      ...current,
      following: !current.following,
    }))
  }

  const likeActionHandler = (id: string) => {
    setItem((current: FeedItem) => ({ ...current, liked: !current.liked }))
  }

  const shareActionHandler = async (url: string) => {
    try {
      await shareService(url)
    } catch (error) {
      Alert.alert(
        'Erro ao compartilhar vídeo',
        'Ocorreu um erro ao compartilhar o vídeo. Por favor, tente novamente mais tarde.',
      )
      console.error('Ec836e4c5', error)
    }
  }

  const sendCommentHandler = async (text: string) => {
    try {
      if (!authenticatedUser) {
        router.replace('/account/sign-in/')
        return
      }
      const newComment: Comment = {
        date: new Date(),
        user: authenticatedUser,
        text,
      }
      setComments((current: Comment[]): Comment[] => [newComment, ...current])
    } catch (error) {
      Alert.alert(
        'Erro ao compartilhar vídeo',
        'Ocorreu um erro ao compartilhar o vídeo. Por favor, tente novamente mais tarde.',
      )
      console.error('Ec836e4c5', error)
    }
  }

  const closeActionHandler = (video: MutableRefObject<Video>) => {
    video.current.stopAsync()
    router.back()
  }

  useEffect(() => {
    const { id } = glob
    if (id) fetchDataHandler(`${id}`)
  }, [glob])

  return (
    <SafeAreaView
      className="flex-1 flex"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === 'android' ? 20 : 0,
      }}>
      {item ? (
        <>
          <VideoPlayerDetails
            {...item}
            closeAction={closeActionHandler}
            followAction={followActionHandler}
            likeAction={likeActionHandler}
            shareAction={shareActionHandler}
          />
          <CommentsList items={comments} sendComment={sendCommentHandler} />
        </>
      ) : null}
    </SafeAreaView>
  )
}
