export interface TabMenuItem {
  link: string
  label: string
  icon: string
}

export interface Screens {
  link: string
  headerShown: boolean
  presentation:
    | 'modal'
    | 'transparentModal'
    | 'containedModal'
    | 'containedTransparentModal'
    | 'fullScreenModal'
    | 'formSheet'
    | 'card'
}
