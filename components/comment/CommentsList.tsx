import { useState } from 'react'
import {
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { CommentItem } from '@/components/comment/CommentItem'
import { Comment } from '@/models/comment'

interface CommentsListProps {
  items: Comment[]
  sendComment: (comment: string) => void
}
export function CommentsList({ items, sendComment }: CommentsListProps) {
  const [isSending, setIsSending] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')

  const sendCommentHandler = async () => {
    try {
      setIsSending(true)
      await sendComment(comment)
      setComment('')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        className="h-1/5 px-6"
        data={items}
        keyExtractor={({ id }: Comment, index: number) =>
          `${index}${id}${Math.random()}`
        }
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => <CommentItem {...item} />}
      />
      <View className="flex flex-row space-x-3 m-3 mb-0">
        <TextInput
          className="rounded-xl px-3 flex-1 h-14fdfdsfs text-base text-black bg-zinc-200"
          placeholder="Digite seu comentário"
          placeholderTextColor="gray"
          keyboardType="default"
          multiline
          onChangeText={setComment}
          value={comment}
          editable={!isSending}
          maxLength={500}
          autoCorrect
          spellCheck
        />
        <TouchableOpacity
          className="bg-red-500 p-4 flex flex-row space-x-3 justify-center items-center rounded-xl"
          onPress={sendCommentHandler}
          disabled={isSending}>
          <Icon color="white" name="send" size={24} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
