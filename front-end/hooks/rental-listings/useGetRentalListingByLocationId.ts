import { useQuery } from '@tanstack/react-query'
import { getRentalListingByLocationId } from '@/services/location'
import { RentalListing } from '@/types/rental-listing'

export function useGetRentalListingByLocationId(locationId?: number) {
  const { data, error, status } = useQuery({
    queryKey: ['rental-listing', locationId],
    queryFn: async ({ queryKey }): Promise<RentalListing | null> => {
      if (!queryKey[1]) {
        return null
      }
      return getRentalListingByLocationId(queryKey[1] as number)
    }
  })

  return {
    rentalListing: data,
    error,
    status
  }
}