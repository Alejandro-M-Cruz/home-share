import { apiClient } from '@/services/api-client'
import { SignupRequest, User } from '@/types/auth'
import { isAxiosError } from 'axios'
import { getDeviceName } from '@/helpers/device-name'
import { getToken } from '@/services/token'

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

export async function getUser(): Promise<User | null> {
  try {
    await csrf()
    const { data } = await apiClient.get<UserResponse>('/api/user', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
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
        case 401:
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
  await createToken({ email, password })
}

type TokenRequest = {
  email: string
  password: string
}

export async function createToken({ email, password }: TokenRequest) {
  await csrf()
  const { data } = await apiClient.post('/sanctum/token', {
    email,
    password,
    device_name: getDeviceName()
  })
  return data as string
}

export async function revokeTokens() {
  await apiClient.delete('/sanctum/token')
}
