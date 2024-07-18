import { z } from 'zod'
import { LoginRequest } from '@/types/auth'
import {
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Text } from '@/components/Text'
import { handleError } from '@/helpers/errors'
import { Link, useRouter } from 'expo-router'

const loginValidationSchema: z.ZodSchema<LoginRequest> = z.object({
  email: z.string().email().min(1).max(320),
  password: z.string().min(8).max(128)
})

export default function LoginScreen() {
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
    <ScrollView className="flex-1" contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/extendedBlueLogo.png')}
        style={styles.image}
      />
      <Text style={styles.title}>LOG IN TO ACCESS YOUR ACCOUNT</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            autoComplete="email"
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
            autoComplete="password"
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
            color: 'gray',
            fontWeight: 'bold',
            textDecorationLine: 'underline'
          }}
        >
          Forgot your password?
        </Text>
      </Link>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loginStatus === 'pending'}
        activeOpacity={0.6}
      >
        <Text className="text-white font-bold text-xl">
          LOG IN
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginVertical: 'auto'
  },
  title: {
    fontSize: 100,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'white',
    height: 50,
    width: 300,
    padding: 10,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: 'white',
    color: 'gray',
    paddingLeft: 20
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#7EC8AC',
    width: 180,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  }
})
