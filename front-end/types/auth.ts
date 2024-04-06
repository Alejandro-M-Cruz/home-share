export type User = {
  id: number
  name: string
  email: string
  emailVerifiedAt: string
  createdAt: string
  updatedAt: string
}

export type SignupRequest = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginRequest = {
  email: string
  password: string
}
