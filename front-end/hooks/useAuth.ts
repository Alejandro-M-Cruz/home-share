import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as auth from '@/services/auth'
import { useRouter } from 'expo-router'

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: auth.getUser
  })

  const invalidateUserQuery = () =>
    queryClient.invalidateQueries({ queryKey: ['user'] })

  const {
    mutate: login,
    error: loginError,
    status: loginStatus
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: auth.login,
    onSuccess: invalidateUserQuery
  })

  const {
    mutate: register,
    error: registerError,
    status: registerStatus
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: auth.register,
    onSuccess: invalidateUserQuery
  })

  return {
    user,
    login,
    loginError,
    loginStatus,
    register,
    registerError,
    registerStatus
  }
}
