import { apiClient } from '@/api/api-client'
import {
  GetRentalListingsParams,
  RentalListingPage
} from '@/types/rental-listing'

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



function createRentalListing() {

}

export { getRentalListings, createRentalListing }
