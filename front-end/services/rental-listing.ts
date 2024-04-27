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

type CreateRentalListingRequest = {
  title: string
  type: 'apartment' | 'house' | 'apartment_block'
  description: string
  monthly_rent: number
  available_rooms: number
  size: number
  bathrooms: number
  bedrooms: number
  year_built: number
  location: {
    country: string
    state: string
    city: string
    street: string
    street_number: string
    door_number?: string
    floor_number?: number
    postal_code: string
    latitude: number
    longitude: number
  }
  amenities: string[]
  images: File[]
}

function createRentalListing() {

}

export { getRentalListings, createRentalListing }
