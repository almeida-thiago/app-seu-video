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
  TouchableOpacity,
} from 'react-native'

import { InputText } from '@/components/inputs/TextInput'
import { GoogleSignIn } from '@/features/GoogleSignIn'
import { AuthenticatedUser, UserSignIn } from '@/models/user'
import { signInService } from '@/services/sign-in'
import { UserContext } from '@/states/UserProviders'

export default function SignIn() {
  const router: Router = useRouter()
  const { setAuthenticatedUser } = useContext(UserContext)
  const [isSending, setIsSending] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignIn>()

  const signInHandler = async (data: UserSignIn) => {
    try {
      setIsSending(true)
      const user: AuthenticatedUser = await signInService(data)
      setAuthenticatedUser(user)
      router.replace('/')
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao entrar',
        'Ocorreu um erro ao entrar. Por favor, tente novamente mais tarde.',
      )
      console.error('E62f8e101', error)
    } finally {
      Keyboard.dismiss()
      setIsSending(false)
    }
  }

  useEffect(() => {
    register('username', { required: true })
    register('password', { required: true })
  }, [])

  return (
    <SafeAreaView className="flex-1 flex justify-center">
      <KeyboardAvoidingView
        keyboardVerticalOffset={25}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="px-6 flex-1 flex justify-center space-y-6">
        <Text className="text-2xl text-center">Bem-vindo de Volta!</Text>
        <Text className="self-center">
          Por favor, faça login para acessar sua conta
        </Text>
        <View className="self-stretch">
          <InputText
            placeholder="Digite seu usuário"
            onChangeText={(text: string) => setValue('username', text)}
            error={errors.username}
            disabled={isSending}
            maxLength={150}
          />
          <InputText
            placeholder="Digite sua senha"
            onChangeText={(text: string) => setValue('password', text)}
            error={errors.password}
            disabled={isSending}
            secureTextEntry
            maxLength={50}
          />
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 flex flex-row space-x-3 justify-center items-center self-center rounded-3xl"
            onPress={handleSubmit(signInHandler)}
            disabled={isSending}>
            <Text className="text-xl font-semibold text-white">Entrar</Text>
          </TouchableOpacity>
        </View>
        <Link
          replace
          className="text-lg self-center active:opacity-50"
          href="/account/sign-up/">
          Criar nova conta
        </Link>
      </KeyboardAvoidingView>
      <View className="px-6">
        <GoogleSignIn />
      </View>
      <Link
        className="text-lg self-center active:opacity-50 mt-8 mb-3"
        href="/(home)/feed/">
        Cancelar
      </Link>
    </SafeAreaView>
  )
}
