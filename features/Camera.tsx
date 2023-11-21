import { Camera, CameraType, FlashMode, VideoCodec } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { Router, useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { CameraMenu } from '@/components/camera/CameraMenu'
import { RecordingIndicator } from '@/components/camera/RecordingIndicator'
import { RecordingContext } from '@/states/RecordingProvider'

interface RequestPermissionProps {
  requestPermission: () => void
}
function RequestPermission({ requestPermission }: RequestPermissionProps) {
  return (
    <View className="flex-1 justify-center px-6 space-y-6 items-center">
      <Text className="text-xl text-center leading-6">
        Precisamos da sua permissão para acessar a câmera e liberar todos os
        recursos do aplicativo.
      </Text>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 flex flex-row space-x-3 justify-center items-center rounded-3xl"
        onPress={requestPermission}>
        <Text className="text-xl font-semibold text-white">
          Aceitar Permissões
        </Text>
      </TouchableOpacity>
    </View>
  )
}

function VideoCamera() {
  const router: Router = useRouter()
  const [toDiscard, setToDiscard] = useState<boolean>(false)
  const [camera, setCamera] = useState<Camera>()
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back)
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const { setRecordingUri } = useContext(RecordingContext)

  const toggleCameraHandler = () => {
    setCameraType((current: CameraType) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    )
  }

  const toggleLightHandler = () => {
    setFlashMode((current: FlashMode) =>
      current === FlashMode.off ? FlashMode.torch : FlashMode.off,
    )
  }

  const startRecordingHandler = async () => {
    try {
      setIsRecording(true)
      const data = await camera.recordAsync({
        maxDuration: 30,
        codec: VideoCodec.H264,
        quality: '1080p',
      })
      setRecordingUri(data.uri)
      setIsRecording(false)
      if (toDiscard) return
      router.replace('/video/send')
    } catch (error: any | Error) {
      console.error('Eafbc8fae', error)
      setIsRecording(false)
    }
  }

  const stopRecordingHandler = async () => {
    try {
      camera.stopRecording()
    } catch (error: any | Error) {
      console.error('E9c637f2f', error)
    }
  }

  const findInMediaLibraryHandler = async () => {
    try {
      const { assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        allowsMultipleSelection: false,
        videoMaxDuration: 30,
        selectionLimit: 1,
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
        videoQuality:
          ImagePicker.UIImagePickerControllerQualityType.IFrame1280x720,
      })
      if (!assets.length) return
      setRecordingUri(assets[0].uri)
      router.replace('/video/send')
    } catch (error: any | Error) {
      console.error('E9301a5ca', error)
    }
  }

  const cancelHandler = async () => {
    try {
      if (isRecording) {
        setToDiscard(true)
        await camera.stopRecording()
      }
      router.replace('..')
    } catch (error: any | Error) {
      console.error('E9e1dd804', error)
    }
  }

  return (
    <View className="flex-1">
      <Camera
        ref={setCamera}
        className="flex-1 flex"
        ratio="16:9"
        type={cameraType}
        flashMode={flashMode}>
        <SafeAreaProvider className="flex items-stretch justify-end">
          <RecordingIndicator isRecording={isRecording} />
          <CameraMenu
            isLightActive={flashMode === FlashMode.torch}
            isRecording={isRecording}
            toggleCamera={toggleCameraHandler}
            toggleLight={toggleLightHandler}
            startRecording={startRecordingHandler}
            stopRecording={stopRecordingHandler}
            findInMediaLibrary={findInMediaLibraryHandler}
            cancel={cancelHandler}
          />
        </SafeAreaProvider>
      </Camera>
    </View>
  )
}

export default function CameraFeature() {
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions()
  const [microphonePermission, requestMicrophonePermission] =
    Camera.useMicrophonePermissions()

  const requestPermissionsHandler = () => {
    requestCameraPermission()
    requestMicrophonePermission()
  }

  if (!cameraPermission || !microphonePermission) return <View />

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return <RequestPermission requestPermission={requestPermissionsHandler} />
  }

  return <VideoCamera />
}
