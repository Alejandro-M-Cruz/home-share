import { z } from 'zod'
import { LoginRequest } from '@/types/auth'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Text } from '@/components/Text'
import { handleError } from '@/helpers/handle-error'
import { Link, useRouter } from 'expo-router'

const loginValidationSchema: z.ZodSchema<LoginRequest> = z.object({
  email: z.string().email().min(1).max(320),
  password: z.string().min(8).max(128)
})

export default function Login() {
  const { login, loginError, loginStatus } = useAuth()
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const router = useRouter()

  useEffect(() => {
    if (loginStatus === 'success') {
      router.replace('/')
      return
    }
    if (loginError) {
      handleError({
        error: loginError,
        setError
      })
    }
    return reset
  }, [loginStatus, loginError, setError, router, reset])

  const onSubmit: SubmitHandler<LoginRequest> = credentials => {
    login(credentials)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Log in into your account</Text>
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
      {errors.email && <Text>{errors.email.message}</Text>}
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
      {errors.password && <Text>{errors.password.message}</Text>}
      {errors.root && (
        <Text style={{ color: 'red' }}>{errors.root.message}</Text>
      )}
      <Link href="/forgot-password" style={{ marginTop: 20 }}>
        <Text
          style={{
            color: '#2196f3',
            fontWeight: 'bold',
            textDecorationLine: 'underline'
          }}
        >
          Forgot your password?
        </Text>
      </Link>
      <Button
        title="Log in"
        onPress={handleSubmit(onSubmit)}
        disabled={loginStatus === 'pending'}
      />
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
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: 'white',
    color: 'gray',
    paddingLeft: 20
  }
})
