import { useAuth } from '@/hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { SignupRequest } from '@/types/auth'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text, View } from '@/components/Themed'
import { Button, StyleSheet, TextInput } from 'react-native'
import { useCallback } from 'react'

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
      message: 'Passwords must match',
      path: ['passwordConfirmation']
    }
  )

export default function Signup() {
  const { signup, signupStatus } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  })
  const onSubmit = useCallback(
    (data: SignupRequest) => {
      signup(data)
    },
    [signup]
  )

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {formErrors.name && (
        <Text style={{ color: 'red' }}>{formErrors.name.message}</Text>
      )}
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password confirmation"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="passwordConfirmation"
      />
      {formErrors.passwordConfirmation && (
        <Text>{formErrors.passwordConfirmation.message}</Text>
      )}
      <Button title="Sign up" onPress={handleSubmit(onSubmit)} disabled={signupStatus === 'pending'} />
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

