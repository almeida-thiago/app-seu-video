import { StatusBar } from 'expo-status-bar'

import Camera from '@/features/Camera'

export default function CameraScreen() {
  return (
    <>
      <StatusBar style="inverted" />
      <Camera />
    </>
  )
}
