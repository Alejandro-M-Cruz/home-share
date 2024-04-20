type User = {
  id: number
  name: string
  email: string
  emailVerifiedAt: string
  createdAt: string
  updatedAt: string
}

type SignupRequest = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

type LoginRequest = {
  email: string
  password: string
}

type PasswordReset = {
  token: string
  email: string
  password: string
  passwordConfirmation: string
}

export {
  User,
  SignupRequest,
  LoginRequest,
  PasswordReset
}
