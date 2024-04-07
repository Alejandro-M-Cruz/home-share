import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as auth from '@/services/auth'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import * as tokenStorage from '@/services/token-storage'
import { LoginRequest } from '@/types/auth'
import { getDeviceName } from '@/helpers/device-name'

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: user,
    error: userError,
    status: userStatus
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const token = tokenStorage.getToken()
      return token !== null ? auth.getUser(token) : null
    }
  })

  const invalidateUserQuery = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['user'] })
  }, [queryClient])

  const {
    mutate: signup,
    error: signupError,
    status: signupStatus
  } = useMutation({
    mutationKey: ['signup'],
    mutationFn: auth.signup,
    onSuccess: async () => {
      await invalidateUserQuery()
      router.push('/')
    }
  })

  const {
    mutate: login,
    error: loginError,
    status: loginStatus
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginRequest) => {
      return auth.createToken({ ...data, deviceName: getDeviceName() })
    },
    onSuccess: async data => {
      tokenStorage.setToken(data)
      await invalidateUserQuery()
      router.push('/')
    }
  })

  const {
    mutate: logout,
    error: logoutError,
    status: logoutStatus
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await invalidateUserQuery()
      const token = tokenStorage.getToken()
      if (token) {
        await tokenStorage.removeToken()
        await auth.revokeTokens(token)
      }
      router.push('/')
    }
  })

  return {
    user,
    userError,
    userStatus,
    signup,
    signupError,
    signupStatus,
    login,
    loginError,
    loginStatus,
    logout,
    logoutError,
    logoutStatus
  }
}
