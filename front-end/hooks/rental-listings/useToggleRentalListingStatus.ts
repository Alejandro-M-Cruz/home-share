import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import * as tokenStorage from '@/services/token-storage'
import { toggleRentalListingStatus } from '@/services/rental-listing'
import { RentalListing } from '@/types/rental-listing'

export function useToggleRentalListingStatus() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, error, status } = useMutation({
    mutationKey: ['toggle-rental-listing-status'],
    mutationFn: async (rentalListing: RentalListing) => {
      const token = await tokenStorage.getToken()
      if (!token) {
        router.push('/login')
        return
      }
      await toggleRentalListingStatus(rentalListing, token)
      await queryClient.invalidateQueries({ queryKey: ['my-rental-listings'] })
    },
    retry: false
  })

  return {
    toggleStatus: mutate,
    error,
    status
  }
}