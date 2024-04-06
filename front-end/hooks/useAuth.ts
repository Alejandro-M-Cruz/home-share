import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as auth from '@/services/auth'
import { useRouter } from 'expo-router'
import { handleError } from '@/helpers/handle-error'
import { useCallback, useState } from 'react'

export function useAuth({ setErrors }: { setErrors: (errors: any) => void }) {
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

  if (userStatus === 'error') {
    handleError({
      error: userError,
      setErrors,
      defaultMessage:
        'An error has occurred while fetching user data. Please try again later.'
    })
  }

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
    },
    onError: error => {
      handleError({
        error,
        setErrors,
        defaultMessage:
          'There has been an error while registering. Please try again later.'
      })
    }
  })

  const {
    mutate: login,
    error: loginError,
    status: loginStatus
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: auth.login,
    onSuccess: async () => {
      await invalidateUserQuery()
      router.push('/')
    },
    onError: error => {
      handleError({
        error,
        setErrors,
        defaultMessage:
          'An error has occurred while logging in. Please try again later'
      })
    }
  })

  return {
    user,
    userStatus,
    login,
    loginStatus,
    signup,
    signupStatus
  }
}
