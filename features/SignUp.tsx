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
import { AuthenticatedUser, UserSignUp } from '@/models/user'
import { signUpService } from '@/services/sign-up'
import { UserContext } from '@/states/UserProviders'

export default function SignUp() {
  const router: Router = useRouter()
  const { setAuthenticatedUser } = useContext(UserContext)
  const [isSending, setIsSending] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUp>()

  const signInHandler = async (data: UserSignUp) => {
    try {
      setIsSending(true)
      const user: AuthenticatedUser = await signUpService(data)
      setAuthenticatedUser(user)
      router.back()
    } catch (error: any | Error) {
      Alert.alert(
        'Erro ao criar conta',
        'Ocorreu um erro ao criar sua conta. Por favor, tente novamente mais tarde.',
      )
      console.error('E62f8e101', error)
    } finally {
      Keyboard.dismiss()
      setIsSending(false)
    }
  }

  useEffect(() => {
    register('name', { required: true })
    register('username', { required: true })
    register('email', { required: true })
    register('password', { required: true })
    register('passwordConfirm', { required: true })
  }, [])

  return (
    <SafeAreaView className="flex-1 flex justify-center">
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="px-6 flex-1 flex justify-center items-stretch space-y-6">
        <Text className="text-2xl text-center">Vamos criar sua conta!</Text>
        <Text className="self-center">
          Por favor, informe os dados solicitados.
        </Text>
        <View className="self-stretch">
          <InputText
            placeholder="Digite um nome de usuário"
            onChangeText={(text: string) => setValue('username', text)}
            error={errors.username}
            disabled={isSending}
            maxLength={50}
          />
          <InputText
            placeholder="Digite seu nome"
            onChangeText={(text: string) => setValue('name', text)}
            error={errors.name}
            disabled={isSending}
            maxLength={150}
          />
          <InputText
            placeholder="Digite seu e-mail"
            onChangeText={(text: string) => setValue('email', text)}
            error={errors.passwordConfirm}
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
          <InputText
            placeholder="Digite novamente a senha"
            onChangeText={(text: string) => setValue('passwordConfirm', text)}
            error={errors.passwordConfirm}
            disabled={isSending}
            secureTextEntry
            maxLength={50}
          />
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 flex flex-row space-x-3 justify-center items-center self-center rounded-3xl"
            onPress={handleSubmit(signInHandler)}
            disabled={isSending}>
            <Text className="text-xl font-semibold text-white">
              Criar Conta
            </Text>
          </TouchableOpacity>
        </View>
        <Link className="text-lg self-center active:opacity-50 mb-3" href="..">
          Cancelar
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
