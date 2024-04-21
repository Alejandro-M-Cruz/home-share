import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { z } from 'zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { handleError } from '@/helpers/handle-error'
import { Link } from 'expo-router'

const passwordResetValidationSchema = z
  .object({
    password: z.string().min(8).max(128),
    passwordConfirmation: z.string().min(8).max(128)
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: 'Passwords must match.',
      path: ['passwordConfirmation']
    }
  )

export default function PasswordReset() {
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(passwordResetValidationSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: ''
    },
    mode: 'onChange'
  })

  const { resetPassword, resetPasswordStatus, resetPasswordError } = useAuth()

  useEffect(() => {
    if (resetPasswordStatus === 'success') {
      reset()
      return
    }
    if (resetPasswordError) {
      handleError({
        error: resetPasswordError,
        setError
      })
    }
  }, [resetPasswordStatus, resetPasswordError, setError])

  const onSubmit: SubmitHandler<{
    password: string
    passwordConfirmation: string
  }> = data => {
    resetPassword(data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={{ color: 'red' }}>{errors.password.message}</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="passwordConfirmation"
      />
      {errors.passwordConfirmation && (
        <Text>{errors.passwordConfirmation.message}</Text>
      )}
      {errors.root && <Text>{errors.root.message}</Text>}
      <Button title="Reset password" onPress={handleSubmit(onSubmit)} />
      {resetPasswordStatus === 'success' && (
        <>
          <Text>Your password has been reset successfully</Text>
          <Text>
            You can now{' '}
            <Link href="/login">
              <Text>log in</Text>
            </Link>{' '}
            with your new password.
          </Text>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600,
    marginHorizontal: 'auto',
    marginVertical: 32,
    backgroundColor: '#f1f1f1'
  },
  title: {
    fontSize: 60,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 40
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'white',
    height: 50,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    color: 'gray',
    paddingLeft: 20
  }
})
