import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SignupRequest } from '@/types/auth'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text, View } from '@/components/Themed'
import { Button, TextInput } from 'react-native'

const signupValidationSchema: ZodType<SignupRequest> = z
  .object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8)
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: 'Passwords must match',
      path: ['passwordConfirmation']
    }
  )

export default function Signup() {
  const [errors, setErrors] = useState({} as any)
  const { signup, signupStatus } = useAuth({
    setErrors
  })
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupValidationSchema),
    errors
  })
  const onSubmit = (data: SignupRequest) => {
    signup(data)
  }

  return (
    <View style={{ maxWidth: 300 }}>
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
        <Text>{formErrors.name.message}</Text>
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
      {formErrors.email && (
        <Text>{formErrors.email.message}</Text>
      )}
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
      {formErrors.password && (
        <Text>{formErrors.password.message}</Text>
      )}
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
        <Text>
          {formErrors.passwordConfirmation.message}
        </Text>
      )}
      <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}
