import { View, Text, ImageBackground } from 'react-native'

import { Comment } from '@/models/comment'

interface CommentItemProps extends Comment {}
export function CommentItem({ date, text, user }: CommentItemProps) {
  return (
    <View className="mb-3 border-b border-zinc-300 pb-3">
      <View className="flex items-center mb-2 flex-1 flex-row space-x-2">
        <View className="flex rounded-full h-8 w-8 overflow-hidden">
          <ImageBackground
            className="flex-1"
            source={
              user.avatar
                ? {
                    uri: user.avatar,
                    cache: 'force-cache',
                  }
                : require('../../assets/no-avatar.png')
            }
            resizeMode="cover"
          />
        </View>
        <View>
          <Text
            numberOfLines={1}
            className="font-semibold text-xs">{`@${user.username} - ${user.name}`}</Text>
          <Text numberOfLines={1} className="text-xs">
            {date
              ? `Escreveu em ${new Date(date).toLocaleDateString()}`
              : 'Data do comentário indiponível'}
          </Text>
        </View>
      </View>
      <Text>{text}</Text>
    </View>
  )
}
