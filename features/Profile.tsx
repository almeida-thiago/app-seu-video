import * as ImagePicker from 'expo-image-picker'
import { Router, useRouter } from 'expo-router'
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
  TouchableOpacity,
} from 'react-native'

import { InputText } from '@/components/inputs/TextInput'
import { Avatar } from '@/components/user/Avatar'
import { AuthenticatedUser, UserSignUp } from '@/models/user'
import { updateProfile } from '@/services/update-profile'
import { UserContext } from '@/states/UserProviders'

type Picture = {
  base64: string
  uri: string
}

export default function Profile() {
  const router: Router = useRouter()
  const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [picture, setPicture] = useState<Picture>()
  const { register, setValue, getValues, handleSubmit } = useForm<UserSignUp>({
    defaultValues: authenticatedUser,
  })

  const updateProfileHandler = async (data: UserSignUp) => {
    try {
      setIsSending(true)
      const updated: AuthenticatedUser = await updateProfile({
        ...authenticatedUser,
        ...data,
        avatar: picture?.base64 || authenticatedUser?.avatar,
      })
      setAuthenticatedUser(updated)
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao atualizar',
        'Ocorreu um erro ao atualizar seu perfil. Por favor, tente novamente mais tarde.',
      )
      console.error('E62f8e101', error)
    } finally {
      Keyboard.dismiss()
      setIsSending(false)
    }
  }

  const signOutHandler = () => {
    setAuthenticatedUser(undefined)
    router.replace('/')
  }

  const changeAvatarHandler = async () => {
    try {
      const { assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: false,
        selectionLimit: 1,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
      })
      if (!assets.length) throw new Error('invalid asset')
      setPicture({
        base64: assets[0].base64,
        uri: assets[0].uri,
      })
      setAuthenticatedUser({ ...authenticatedUser, avatar: assets[0].uri })
    } catch (error: any | Error) {
      console.error('E9301a5ca', error)
    }
  }

  useEffect(() => {
    register('name', { required: true, value: authenticatedUser.name })
    register('email', { required: true, value: authenticatedUser.email })
    register('password')
    register('passwordConfirm')
  }, [])

  return (
    <SafeAreaView className="flex-1 flex justify-center">
      <KeyboardAvoidingView
        keyboardVerticalOffset={25}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="px-6 flex-1 flex justify-center items-stretch space-y-6">
        <View className="flex justify-center items-center">
          <Avatar
            uri={picture?.uri || authenticatedUser.avatar}
            changeAvatar={changeAvatarHandler}
          />
          <Text className="text-2xl text-center">{authenticatedUser.name}</Text>
          <Text className="text-center">{`@${authenticatedUser.username}`}</Text>
        </View>
        <Text className="text-center text-lg font-semibold">{`${
          authenticatedUser.followers || 0
        } Seguidores | ${authenticatedUser.following || 0} Seguindo`}</Text>
        <View>
          <InputText
            placeholder="Digite seu nome"
            defaultValue={getValues('name')}
            onChangeText={(text: string) => setValue('name', text)}
            disabled={isSending}
            maxLength={150}
          />
          <InputText
            placeholder="Digite seu e-mail"
            defaultValue={getValues('email')}
            onChangeText={(text: string) => setValue('email', text)}
            disabled={isSending}
            maxLength={150}
          />
          <InputText
            placeholder="Digite sua senha"
            onChangeText={(text: string) => setValue('password', text)}
            disabled={isSending}
            secureTextEntry
            maxLength={50}
          />
          <InputText
            placeholder="Digite novamente a senha"
            onChangeText={(text: string) => setValue('passwordConfirm', text)}
            disabled={isSending}
            secureTextEntry
            maxLength={50}
          />
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 flex flex-row space-x-3 justify-center items-center self-center rounded-3xl"
            onPress={handleSubmit(updateProfileHandler)}
            disabled={isSending}>
            <Text className="text-xl self-center font-semibold text-white">
              Salvar Alterações
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={signOutHandler}>
        <Text className="text-lg self-center active:opacity-50 mb-3">
          Sair da Conta
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
