import { useMutation } from '@tanstack/react-query'
import { createRentalListing } from '@/services/rental-listing'
import { CreateRentalListingRequest } from '@/types/rental-listing'
import * as tokenStorage from '@/services/token-storage'
import { useRouter } from 'expo-router'
import { useRentalListingStore } from '@/hooks/rental-listings/useRentalListingStore'

export function useCreateRentalListing() {
  const router = useRouter()
  const { setId } = useRentalListingStore()

  const { mutate, error, status } = useMutation({
    mutationKey: ['create-rental-listing'],
    mutationFn: async (data: CreateRentalListingRequest) => {
      const token = await tokenStorage.getToken()
      if (!token) {
        router.push('/login')
        return
      }
      const rentalListingId = await createRentalListing(data, token)
      setId(rentalListingId)
    }
  })

  return {
    createRentalListing: mutate,
    error,
    status
  }
}
