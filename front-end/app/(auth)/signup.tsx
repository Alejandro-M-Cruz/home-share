import { useAuth } from '@/hooks/useAuth'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SignupRequest } from '@/types/auth'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text, View } from '@/components/Themed'
import { Button, StyleSheet, TextInput } from 'react-native'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { handleError } from '@/helpers/handle-error'

const signupValidationSchema: ZodType<SignupRequest> = z
  .object({
    name: z.string().min(1).max(255),
    email: z.string().email().min(1).max(320),
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

export default function Signup() {
  const { signup, signupError, signupStatus } = useAuth()
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    mode: 'onChange'
  })

  const router = useRouter()

  useEffect(() => {
    if (signupStatus === 'success') {
      router.replace('/')
      return
    }
    if (signupError) {
      handleError({
        error: signupError,
        setError
      })
    }
    return reset
  }, [signupStatus, signupError, setError, router, reset])

  const onSubmit: SubmitHandler<SignupRequest> = (data) => {
    signup(data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>
        You are one step away from finding your new home
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && (
        <Text style={{ color: 'red' }}>{errors.name.message}</Text>
      )}
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            placeholder="Password confirmation"
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
      <Button
        title="Sign up"
        onPress={handleSubmit(onSubmit)}
        disabled={signupStatus === 'pending'}
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
