import { useAuth } from '@/hooks/useAuth'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SignupRequest } from '@/types/auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@/components/Text'
import { Image, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { handleError } from '@/helpers/handle-error'

const signupValidationSchema: z.ZodSchema<SignupRequest> = z
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

export default function SignupScreen() {
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

  const onSubmit: SubmitHandler<SignupRequest> = data => {
    signup(data)
  }

  return (
    <View style={styles.container}>
      <Image
      source={require('../../assets/images/extendedBlueLogo.png')}
      style={styles.image}
    />
      <Text style={{ fontSize: 33, color: '#000', fontWeight: 'bold'}}>Register</Text>
      <Text style={{fontSize: 20, color: 'gray'}}>
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
      
      <TouchableOpacity style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={signupStatus === 'pending'}
        activeOpacity={0.6}
        >SIGN UP
      </TouchableOpacity>
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
    marginVertical: 'auto',
    backgroundColor: '#f1f1f1'
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'white',
    height: 50,
    width: 300,
    padding: 10,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    color: 'gray',
    paddingLeft: 20
  },
  button: {
    backgroundColor: '#7EC8AC',
    width: 180,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 33,
    color: '#000',
    fontWeight: 'bold',
  },
})
