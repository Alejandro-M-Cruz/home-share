import { ScrollView } from 'react-native'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'
import { ImagePicker } from '@/components/ImagePicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { useRentalListingStore } from '@/hooks/useRentalListingStore'
import { useRouter } from 'expo-router'
import { ImagePickerAsset } from 'expo-image-picker'

const secondStepSchema: z.ZodSchema<{ images: ImagePickerAsset[] }> =
  z.object({
    images: z.array(z.any()).min(1).max(10)
  }).refine(({ images }: { images: ImagePickerAsset[] }) => {
    images.every(image => image?.fileSize ?? 0 < 4_000_000)
  }, {
    message: 'Every image must be smaller than 4 MB',
    path: ['images']
  })

export default function CreateRentalListingSecondStepScreen() {
  const { rentalListing, update } = useRentalListingStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(secondStepSchema),
    defaultValues: {
      images: rentalListing.images ?? []
    },
    mode: 'onChange'
  })

  const router = useRouter()

  const onSubmit = async ({ images }: { images: ImagePickerAsset[] }) => {
    if (!isValid) {
      return
    }
    update({ images })
    router.replace('/create-rental-listing/third-step')
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

