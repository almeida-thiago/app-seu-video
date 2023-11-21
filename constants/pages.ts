import { Screens } from '@/models/core'

export const SCREENS: Screens[] = [
  {
    link: 'account/sign-in/index',
    headerShown: false,
    presentation: 'modal',
  },
  {
    link: 'account/sign-up/index',
    headerShown: false,
    presentation: 'modal',
  },
  {
    link: 'user/profile/index',
    headerShown: false,
    presentation: 'modal',
  },
  {
    link: 'video/camera/index',
    headerShown: false,
    presentation: 'fullScreenModal',
  },
  {
    link: 'video/details/[id]/index',
    headerShown: false,
    presentation: 'modal',
  },
  {
    link: 'video/send/index',
    headerShown: false,
    presentation: 'containedModal',
  },
]
