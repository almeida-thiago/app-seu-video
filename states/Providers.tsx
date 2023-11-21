import { ReactNode } from 'react'

import ContentProvider from '@/states/ContentProvider'
import RecordingProvider from '@/states/RecordingProvider'
import UserProvider from '@/states/UserProviders'

interface ProviderProps {
  children: ReactNode | ReactNode[]
}
export default function Providers({ children }: ProviderProps) {
  return (
    <ContentProvider>
      <UserProvider>
        <RecordingProvider>{children}</RecordingProvider>
      </UserProvider>
    </ContentProvider>
  )
}
