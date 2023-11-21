import { Video, ResizeMode } from 'expo-av'
import { Link, Router, useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  Alert,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'

import { ActionButton } from '@/components/buttons/ActionButton'
import { InputText } from '@/components/inputs/TextInput'
import { FeedItem } from '@/models/feed'
import { UploadVideo } from '@/models/upload'
import { uploadVideoService } from '@/services/upload-video'
import { ContentContext } from '@/states/ContentProvider'
import { RecordingContext } from '@/states/RecordingProvider'
import { UserContext } from '@/states/UserProviders'

export default function SendVideo() {
  const router: Router = useRouter()
  const { recordingUri, setRecordingUri } = useContext(RecordingContext)
  const { appendUploadItem } = useContext(ContentContext)
  const { authenticatedUser } = useContext(UserContext)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadVideo>()

  const uploadVideoHandler = async (data: UploadVideo) => {
    try {
      setIsSending(true) /*
      const { uri } = await VideoThumbnails.getThumbnailAsync(recordingUri, {
        time: 5000,
      })
      data.poster = uri*/
      data.user = authenticatedUser
      const uploaded: FeedItem = await uploadVideoService(data)
      appendUploadItem(uploaded)
      setRecordingUri(undefined)
      router.back()
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao enviar vídeo',
        'Ocorreu um erro ao enviar o vídeo. Por favor, tente novamente mais tarde.',
      )
      console.error('E62f8e101', error)
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    register('uri', { value: recordingUri, required: true })
    register('title', { required: true })
    register('description', { required: true })
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true),
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false),
    )
    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <TouchableWithoutFeedback
      className="flex-1 flex"
      onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 flex">
        <Text className="text-center text-2xl font-semibold">
          Envie seu vídeo!
        </Text>
        <View className="flex-1 flex p-6 rounded-2xl">
          <Video
            className="flex-1 rounded-2xl"
            source={{
              uri: recordingUri,
            }}
            shouldPlay
            useNativeControls
            resizeMode={isKeyboardOpen ? ResizeMode.CONTAIN : ResizeMode.COVER}
          />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={25}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="px-6 flex justify-center space-y-6">
          <InputText
            placeholder="Digite título para seu vídeo"
            onChangeText={(text: string) => setValue('title', text)}
            error={errors.title}
            disabled={isSending}
            maxLength={250}
          />
          <InputText
            placeholder="Digite uma descricao para seu vídeo"
            onChangeText={(text: string) => setValue('description', text)}
            error={errors.description}
            disabled={isSending}
            maxLength={500}
            textarea
          />
          <ActionButton
            onPress={handleSubmit(uploadVideoHandler)}
            isDisabled={isSending}>
            {isSending ? 'Enviando Vídeo...' : 'Enviar Vídeo'}
          </ActionButton>
          <Link className="text-lg self-center active:opacity-50" href="../">
            Cancelar
          </Link>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
