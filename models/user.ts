export interface User {
  username: string
  name: string
  email: string
  avatar?: string
  followers?: number
  following?: number
}

export interface UserSignIn {
  username: string
  password: string
}

export interface UserSignUp extends User {
  password: string
  passwordConfirm: string
}

export interface AuthenticatedUser extends User {
  tokens: {
    access: string
    refresh: string
    google: string
  }
}
