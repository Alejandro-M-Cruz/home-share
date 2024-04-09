import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as auth from '@/services/auth'
import { Href, useRouter } from 'expo-router'
import { useCallback } from 'react'
import * as tokenStorage from '@/services/token-storage'
import { LoginRequest, SignupRequest } from '@/types/auth'
import { getDeviceName } from '@/helpers/device-name'

export function useAuth({
  redirectIfNotAuthenticated
}: { redirectIfNotAuthenticated?: Href<string> } = {}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const invalidateUserQuery = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['user'] })
  }, [queryClient])

  const userQueryFn = async () => {
    const token = await tokenStorage.getToken()
    if (!token) {
      if (redirectIfNotAuthenticated) {
        router.push(redirectIfNotAuthenticated)
      }
      return null
    }
    const user = await auth.getUser(token)
    if (!user) {
      await tokenStorage.removeToken()
      if (redirectIfNotAuthenticated) {
        router.push(redirectIfNotAuthenticated)
      }
    }
    return user
  }

  const {
    data: user,
    error: userError,
    status: userStatus
  } = useQuery({
    queryKey: ['user'],
    queryFn: userQueryFn,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  const signupMutationFn = async (data: SignupRequest) => {
    const token = await auth.signup(data)
    await tokenStorage.setToken(token)
    await invalidateUserQuery()
  }

  const {
    mutate: signup,
    error: signupError,
    status: signupStatus
  } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signupMutationFn
  })

  const loginMutationFn = async (data: LoginRequest) => {
    const token = await auth.createToken({
      ...data,
      deviceName: getDeviceName()
    })
    await tokenStorage.setToken(token)
    await invalidateUserQuery()
  }

  const {
    mutate: login,
    error: loginError,
    status: loginStatus
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginMutationFn
  })

  const logoutMutationFn = async () => {
    const token = await tokenStorage.getToken()
    if (token) {
      await auth.revokeTokens(token)
      await tokenStorage.removeToken()
    }
    await invalidateUserQuery()
  }

  const {
    mutate: logout,
    error: logoutError,
    status: logoutStatus
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutMutationFn
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
