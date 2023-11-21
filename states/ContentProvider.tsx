import { ReactNode, createContext, useState } from 'react'

import { FeedItem } from '@/models/feed'
import { Message } from '@/models/message'

interface Content {
  feed: FeedItem[]
  appendUploadItem: (item: FeedItem) => void
  appendFeedItem: (items: FeedItem[]) => void
  liked: FeedItem[]
  appendLikedItems: (items: FeedItem[]) => void
  messages: Message[]
  appendMessageItem: (message: Message) => void
}

const initialValue: Content = {
  feed: [],
  appendUploadItem: (item: FeedItem) => {},
  appendFeedItem: (items: FeedItem[]) => {},
  liked: [],
  appendLikedItems: (items: FeedItem[]) => {},
  messages: [],
  appendMessageItem: (message: Message) => {},
}

export const ContentContext = createContext<Content>(initialValue)

interface ContentProviderProps {
  children: ReactNode | ReactNode[]
}
export default function ContentProvider({ children }: ContentProviderProps) {
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [liked, setLiked] = useState<FeedItem[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  const appendUploadItem = (item: FeedItem) => {
    setLiked((current: FeedItem[]): FeedItem[] => [item, ...current])
  }

  const appendFeedItem = (items: FeedItem[]) => {
    setFeed((current: FeedItem[]): FeedItem[] => [...current, ...items])
  }

  const appendLikedItems = (items: FeedItem[]) => {
    setLiked((current: FeedItem[]): FeedItem[] => [...current, ...items])
  }

  const appendMessageItem = (message: Message) => {
    setMessages((current: Message[]): Message[] => [message, ...current])
  }

  return (
    <ContentContext.Provider
      value={{
        feed,
        liked,
        messages,
        appendFeedItem,
        appendLikedItems,
        appendMessageItem,
        appendUploadItem,
      }}>
      {children}
    </ContentContext.Provider>
  )
}
