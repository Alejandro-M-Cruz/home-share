import { useInfiniteQuery } from '@tanstack/react-query'
import { getRentalListings } from '@/services/rental-listing'

export function useRentalListings() {
  return useInfiniteQuery({
    queryKey: ['rental-listings'],
    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.meta.nextCursor,
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getRentalListings({ cursor: pageParam }),
    refetchOnWindowFocus: true
  })
}
