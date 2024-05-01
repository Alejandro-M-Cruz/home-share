import { useMutation } from '@tanstack/react-query'
import { createRentalListing } from '@/services/rental-listing'

export function useCreateRentalListing() {
  const { mutate, error, status } = useMutation({
    mutationKey: ['create-rental-listing'],
    mutationFn: createRentalListing
  })

  return {
    createRentalListing: mutate,
    error,
    status
  }
}
