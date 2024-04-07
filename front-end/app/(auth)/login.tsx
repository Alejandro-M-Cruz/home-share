import { z } from 'zod'
import { LoginRequest } from '@/types/auth'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { Text } from '@/components/Themed'

const loginValidationSchema: z.ZodType<LoginRequest> = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
})

export default function Login() {
  const { login, loginError, loginStatus } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = useCallback(
    (data: LoginRequest) => {
      login(data)
    },
    [login]
  )

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="email"
          />
        )}
        name="email"
      />
      {formErrors.email && <Text>{formErrors.email.message}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {formErrors.password && <Text>{formErrors.password.message}</Text>}
      <Button title="Log in" onPress={handleSubmit(onSubmit)} disabled={loginStatus === 'pending'}/>
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
    marginVertical: 32
  }
})
