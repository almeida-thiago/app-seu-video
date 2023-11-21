import { StatusBar } from 'react-native'

import VideoDetails from '@/features/VideoDetails'


export default function VideoDetailsScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <VideoDetails />
    </>
  )
}
