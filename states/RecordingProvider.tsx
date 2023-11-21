import { ReactNode, createContext, useState } from 'react'

interface Recording {
  recordingUri?: string
  setRecordingUri: (uri?: string) => void
}

const initialValue: Recording = {
  recordingUri: undefined,
  setRecordingUri: (uri) => {},
}

export const RecordingContext = createContext<Recording>(initialValue)

interface RecordingProviderProps {
  children: ReactNode | ReactNode[]
}
export default function RecordingProvider({
  children,
}: RecordingProviderProps) {
  const [recordingUri, setRecordingUri] = useState<string>()

  return (
    <RecordingContext.Provider value={{ recordingUri, setRecordingUri }}>
      {children}
    </RecordingContext.Provider>
  )
}
