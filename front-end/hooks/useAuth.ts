import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as auth from '@/services/auth'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { getToken, removeToken, setToken } from '@/services/token'

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: user,
    error: userError,
    status: userStatus
  } = useQuery({
    queryKey: ['user'],
    queryFn: auth.getUser
  })

  const invalidateUserQuery = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['user'] })
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

  const token = getToken()

  const {
    mutate: login,
    error: loginError,
    status: loginStatus
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: auth.createToken,
    onSuccess: async (data) => {
      setToken(data)
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
    mutationFn: auth.revokeTokens,
    onSuccess: async () => {
      await removeToken()
      await invalidateUserQuery()
      router.push('/')
    },
    onError: async () => {
      await removeToken()
    }
  })

  return {
    user,
    userStatus,
    signup,
    signupStatus,
    login,
    loginStatus,
    logout,
    logoutStatus
  }
}
