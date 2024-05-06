import { useRouter } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import * as tokenStorage from '@/services/token-storage'
import { uploadRentalListingImages } from '@/services/rental-listing'
import { useRentalListingStore } from '@/hooks/rental-listings/useRentalListingStore'
import { ImagePickerAsset } from 'expo-image-picker'
import { assetToBlob } from '@/helpers/image-picker'

export function useUploadRentalListingImages() {
  const router = useRouter()
  const { id } = useRentalListingStore()

  const { mutate, error, status } = useMutation({
    mutationKey: ['upload-rental-listing-images'],
    mutationFn: async (assets: ImagePickerAsset[]) => {
      const token = await tokenStorage.getToken()
      if (!token) {
        router.push('/login')
        return
      }
      if (!id) {
        router.push('/create-rental-listing/first-step')
        return
      }
      const images = await Promise.all(assets.map(assetToBlob))
      await uploadRentalListingImages(id, images, token)
    },
    retry: false
  })

  return {
    uploadImages: mutate,
    error,
    status
  }
}
