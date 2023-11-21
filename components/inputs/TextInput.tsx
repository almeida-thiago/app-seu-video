import { FieldError } from 'react-hook-form'
import { TextInput, View } from 'react-native'

interface InputTextProps {
  onChangeText: (text: string) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  textarea?: boolean
  error?: FieldError
  secureTextEntry?: boolean
  defaultValue?: string
}
export function InputText({
  onChangeText,
  placeholder,
  disabled,
  maxLength,
  textarea,
  secureTextEntry,
  defaultValue,
  error,
}: InputTextProps) {
  return (
    <View
      className={`rounded-xl p-3 mb-6 border-2 border-solid text-base text-black bg-zinc-200 ${
        textarea ? 'h-28' : 'h-auto'
      } ${error ? 'border-red-500' : 'border-zinc-200'}`}>
      <TextInput
        multiline={textarea}
        placeholder={placeholder}
        placeholderTextColor={error ? '#EF4444' : 'gray'}
        onChangeText={onChangeText}
        defaultValue={defaultValue}
        editable={!disabled}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoCorrect
        spellCheck
      />
    </View>
  )
}
