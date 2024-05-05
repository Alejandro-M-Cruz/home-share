import { useInfiniteQuery } from '@tanstack/react-query'
import { getMyRentalListings } from '@/services/rental-listing'
import {
  MyRentalListingsParams,
  RentalListingPage
} from '@/types/rental-listing'
import { useEffect, useState } from 'react'
import * as tokenStorage from '@/services/token-storage'
import { useRouter } from 'expo-router'

export function useMyRentalListings() {
  const router = useRouter()
  const [params, setParams] = useState<MyRentalListingsParams>({})

  const infiniteQuery = useInfiniteQuery({
    queryKey: ['my-rental-listings'],
    initialPageParam: null,
    getNextPageParam: (lastPage: RentalListingPage) =>
      lastPage.meta.nextCursor
        ? { ...params, cursor: lastPage.meta.nextCursor }
        : undefined,
    queryFn: async ({ pageParam }) => {
      const token = await tokenStorage.getToken()
      if (!token) {
        router.push('/login')
        throw new Error('Unauthorized')
      }
      return getMyRentalListings(pageParam ?? params, token ?? '')
    },
    refetchOnWindowFocus: true,
    retry: false
  })

  useEffect(() => {
    if (infiniteQuery.isFetching) return
    infiniteQuery.refetch()
  }, [params])

  return { ...infiniteQuery, params, setParams }
}
