import { Platform, SafeAreaView, StatusBar } from 'react-native'

import Feed from '@/features/Feed'
import Header from '@/features/Header'

export default function FeedScreen() {
  return (
    <>
      <SafeAreaView
        className="bg-red-500 rounded-b-3xl"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 0,
        }}>
        <StatusBar barStyle="light-content" />
        <Header />
      </SafeAreaView>
      <Feed />
    </>
  )
}
