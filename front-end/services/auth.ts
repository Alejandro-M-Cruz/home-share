import { apiClient } from '@/services/api-client'
import { User } from '@/types/user'

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

export async function getUser(): Promise<User> {
  await csrf()
  const { data } = await apiClient.get<UserResponse>('/api/user')
  return {
    ...data,
    emailVerifiedAt: data.email_verified_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

type RegisterRequest = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export async function register({
  name,
  email,
  password,
  passwordConfirmation
}: RegisterRequest) {
  await csrf()
  await apiClient.post('/register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation
  })
}

type LoginRequest = {
  email: string
  password: string
}

export async function login(credentials: LoginRequest) {
  try {
    await csrf()
    await apiClient.post('/login', credentials)
  } catch (error) {}
}
