import { apiClient } from '@/services/api-client'
import { SignupRequest, User } from '@/types/auth'
import { HttpStatusCode, isAxiosError } from 'axios'
import { getDeviceName } from '@/helpers/device-name'

async function csrf() {
  await apiClient.get('/sanctum/csrf-cookie')
}

type UserResponse = {
  id: number
  name: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
}

export async function getUser(token: string): Promise<User | null> {
  try {
    await csrf()
    const { data } = await apiClient.get<UserResponse>('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return {
      ...data,
      emailVerifiedAt: data.email_verified_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.response?.status) {
        case HttpStatusCode.Unauthorized:
          return null
        default:
          throw error
      }
    }
    throw error
  }
}

export async function signup({
  name,
  email,
  password,
  passwordConfirmation
}: SignupRequest) {
  await csrf()
  await apiClient.post('/register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation
  })
  return createToken({
    email,
    password,
    deviceName: getDeviceName()
  })
}

type TokenRequest = {
  email: string
  password: string
  deviceName: string
}

export async function createToken({
  email,
  password,
  deviceName
}: TokenRequest) {
  await csrf()
  const { data, status } = await apiClient.post<string>('/sanctum/token', {
    email,
    password,
    device_name: deviceName
  })
  return data
}

export async function revokeTokens(token: string) {
  await csrf()
  await apiClient.delete('/sanctum/token', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
