import { ScrollView, View } from 'react-native'
import { z } from 'zod'
import { CreateRentalListingRequest } from '@/types/rental-listing'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import { ImagePicker } from '@/components/ImagePicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'

const secondStepSchema: z.ZodSchema<Partial<CreateRentalListingRequest>> =
  z.object({
    images: z.array(z.any()).min(1).max(10)
  })

export default function CreateRentalListingSecondStepScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Partial<CreateRentalListingRequest>>({
    resolver: zodResolver(secondStepSchema),
    defaultValues: {
      images: []
    },
    mode: 'onChange'
  })

  const onSubmit = (data: Partial<CreateRentalListingRequest>) => {

  }

  return (
    <ScrollView className="flex-1 px-2 sm:px-5 py-4">
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ImagePicker
            className="mx-auto my-5"
            images={value ?? []}
            onImagesChange={onChange}
            onSelectionDialogClose={onBlur}
          />
        )}
        name="images"
      />
      <Button disabled={!isValid} onPress={handleSubmit(onSubmit)}>
        <Text>Next</Text>
      </Button>
    </ScrollView>
  )
}
