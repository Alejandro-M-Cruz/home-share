import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { z } from 'zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { handleError } from '@/helpers/handle-error'

const forgotPasswordValidationSchema = z.object({
  email: z.string().email()
})

export default function ForgotPassword() {
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: ''
    },
    mode: 'onChange'
  })

  const { forgotPassword, forgotPasswordError, forgotPasswordStatus } = useAuth()

  useEffect(() => {
    if (forgotPasswordStatus === 'success') {
      reset()
      return
    }
    if (forgotPasswordError) {
      handleError({
        error: forgotPasswordError,
        setError
      })
    }
  }, [forgotPasswordStatus, forgotPasswordError, setError])

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    forgotPassword(data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot my password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="email"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={{ color: 'red' }}>{errors.email.message}</Text>
      )}
      {errors.root && <Text>{errors.root.message}</Text>}
      <Button
        title="Send reset link"
        onPress={handleSubmit(onSubmit)}
      />
      {forgotPasswordStatus === 'success' && (
        <Text>The password reset link has been sent to your email</Text>
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

