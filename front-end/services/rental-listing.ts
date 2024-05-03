import { apiClient } from '@/api/api-client'
import {
  CreateRentalListingRequest,
  GetRentalListingsParams,
  RentalListingPage
} from '@/types/rental-listing'
import { assetToBlob } from '@/helpers/image-picker'

async function getRentalListings({
  cursor,
  perPage,
  sortBy,
  sortDirection,
  filters
}: GetRentalListingsParams) {
  const { data } = await apiClient.get<RentalListingPage>(
    '/api/rental-listings',
    {
      params: {
        cursor,
        per_page: perPage,
        sort: sortBy && (sortDirection === 'desc' ? '-' : '') + sortBy,
        filter: {
          type: filters?.type,
          country: filters?.country,
          city: filters?.city,
          monthly_rent_between: filters?.maxMonthlyRent
            ? [filters?.minMonthlyRent, filters?.maxMonthlyRent]
            : filters?.minMonthlyRent,
          available_rooms_between: filters?.maxAvailableRooms
            ? [filters?.minAvailableRooms, filters?.maxAvailableRooms]
            : filters?.minAvailableRooms
        }
      }
    }
  )
  return data
}

async function createRentalListing(rentalListing: CreateRentalListingRequest, token: string) {
  const data = {
    ...rentalListing,
    images: await Promise.all(rentalListing.images.map(assetToBlob))
  }
  console.log(data)
  await apiClient.post('/api/rental-listings', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export { getRentalListings, createRentalListing }
