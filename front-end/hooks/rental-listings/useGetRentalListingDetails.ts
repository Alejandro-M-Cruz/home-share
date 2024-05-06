import { getRentalListingDetails } from '@/services/rental-listing'
import * as tokenStorage from '@/services/token-storage'
import { useQuery } from '@tanstack/react-query'

export function useGetRentalListingDetails(id: number) {
  const { data, error, status } = useQuery({
    queryKey: ['rental-listing-details', id],
    queryFn: async ({ queryKey }) => {
      const token = await tokenStorage.getToken()
      return getRentalListingDetails(queryKey[1] as number, token)
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })

  return {
    rentalListingDetails: data,
    error,
    status
  }
}
