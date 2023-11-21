import { StatusBar } from 'react-native'

import Profile from '@/features/Profile'

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Profile />
    </>
  )
}
