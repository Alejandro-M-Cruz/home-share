import { apiClient } from '@/api/api-client'
import { RentalListing } from '@/types/rental-listing'

type RentalListingsResponse = {
  data: RentalListing[]
  links: {
    first: string | null
    last: string | null
    next: string | null
    prev: string | null
  }
  meta: {
    path: string
    perPage: number
    nextCursor: string | null
    prevCursor: string | null
  }
}

async function getRentalListings({ cursor }: { cursor: string | null }) {
  const params = cursor ? { cursor } : {}
  const { data } = await apiClient.get<RentalListingsResponse>(
    '/api/rental-listings',
    {
      params
    }
  )
  return data
}

export { getRentalListings }
