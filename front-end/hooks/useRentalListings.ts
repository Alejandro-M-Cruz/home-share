import { useInfiniteQuery } from '@tanstack/react-query'
import { getRentalListings } from '@/services/rental-listing'
import { GetRentalListingsParams, RentalListingPage } from '@/types/rental-listing'
import { useEffect, useState } from 'react'

export function useRentalListings() {
  const [params, setParams] = useState<GetRentalListingsParams>({})

  const infiniteQuery = useInfiniteQuery({
    queryKey: ['rental-listings'],
    initialPageParam: null,
    getNextPageParam: (lastPage: RentalListingPage) =>
      lastPage.meta.nextCursor ? { ...params, cursor: lastPage.meta.nextCursor } : undefined,
    queryFn: ({ pageParam }) =>
      getRentalListings(pageParam ?? params),
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    if (infiniteQuery.isFetching)
      return
    infiniteQuery.refetch()
  }, [params])

  return { ...infiniteQuery, params, setParams }
}
