import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as tokenStorage from '@/services/token-storage'
import { deleteRentalListing } from '@/services/rental-listing'
import { useRouter } from 'expo-router'
import { RentalListing } from '@/types/rental-listing'

export function useDeleteRentalListing() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, error, status } = useMutation({
    mutationKey: ['delete-rental-listing'],
    mutationFn: async (rentalListing: RentalListing) => {
      const token = await tokenStorage.getToken()
      if (!token) {
        router.push('/login')
        return
      }
      await deleteRentalListing(rentalListing, token)
      await queryClient.invalidateQueries({ queryKey: ['my-rental-listings'] })
    },
    retry: false
  })

  return {
    deleteRentalListing: mutate,
    status,
    error
  }
}
