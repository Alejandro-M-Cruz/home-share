import { ScrollView } from 'react-native'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { ImagePicker } from '@/components/ImagePicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { useRouter } from 'expo-router'
import { ImagePickerAsset } from 'expo-image-picker'
import { useUploadRentalListingImages } from '@/hooks/rental-listings/useUploadRentalListingImages'
import { handleError } from '@/helpers/errors'
import { ErrorList } from '@/components/ErrorList'

const secondStepSchema: z.ZodSchema<{ images: ImagePickerAsset[] }> = z
  .object({
    images: z
      .array(z.any())
      .min(1, 'At least one image must be selected')
      .max(10, 'Maximum of 10 images allowed')
  })
  .refine(
    ({ images }: { images: ImagePickerAsset[] }) => {
      return images.every(image => image?.fileSize ?? 0 < 4_000_000)
    },
    {
      message: 'Every image must be smaller than 4 MB',
      path: ['images']
    }
  )

export default function CreateRentalListingThirdStepScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm<{ images: ImagePickerAsset[] }>({
    resolver: zodResolver(secondStepSchema),
    defaultValues: {
      images: []
    },
    mode: 'onChange'
  })

  const router = useRouter()

  const { uploadImages, status, error } = useUploadRentalListingImages()

  const onSubmit = ({ images }: { images: ImagePickerAsset[] }) => {
    uploadImages(images)
  }

  useEffect(() => {
    if (status === 'success') {
      router.push('/my-rental-listings')
      return
    }
    if (error) {
      handleError({ error, setError })
    }
  }, [status, error, router, setError])

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
      <ErrorList errors={errors} />
      <Button disabled={!isValid} onPress={handleSubmit(onSubmit)}>
        <Text>Confirm</Text>
      </Button>
    </ScrollView>
  )
}
