import { apiJsonClient } from '@/api/api-client'
import { PasswordReset, SignupRequest, User } from '@/types/auth'
import { getDeviceName } from '@/helpers/device-name'

export async function csrf() {
  await apiJsonClient.get('/sanctum/csrf-cookie')
}

async function getUser(token: string): Promise<User> {
  const { data } = await apiJsonClient.get<User>('/api/user', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

async function signup(signupData: SignupRequest) {
  await csrf()
  await apiJsonClient.post('/register', signupData)
  return createToken({
    email: signupData.email,
    password: signupData.password,
    deviceName: getDeviceName()
  })
}

type TokenRequest = {
  email: string
  password: string
  deviceName: string
}

async function createToken(tokenRequest: TokenRequest) {
  await csrf()
  const { data: token } = await apiJsonClient.post<string>(
    '/sanctum/token',
    tokenRequest
  )
  return token
}

async function revokeTokens(token: string) {
  await csrf()
  await apiJsonClient.delete('/sanctum/token', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

async function forgotPassword({ email }: { email: string }) {
  await csrf()
  await apiJsonClient.post('/forgot-password', { email })
}

async function resetPassword(passwordReset: PasswordReset) {
  await csrf()
  await apiJsonClient.post('/reset-password', passwordReset)
}

export {
  getUser,
  signup,
  createToken,
  revokeTokens,
  forgotPassword,
  resetPassword
}
