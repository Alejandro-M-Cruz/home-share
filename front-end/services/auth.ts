import { apiClient } from '@/api/api-client'
import { SignupRequest, User } from '@/types/auth'
import { getDeviceName } from '@/helpers/device-name'

export async function csrf() {
  await apiClient.get('/sanctum/csrf-cookie')
}

async function getUser(token: string): Promise<User> {
  const { data } = await apiClient.get<User>('/api/user', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}

async function signup(signupData: SignupRequest) {
  await csrf()
  await apiClient.post('/register', signupData)
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
  const { data: token } = await apiClient.post<string>(
    '/sanctum/token',
    tokenRequest
  )
  return token
}

async function revokeTokens(token: string) {
  await apiClient.delete('/sanctum/token', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export { getUser, signup, createToken, revokeTokens }
