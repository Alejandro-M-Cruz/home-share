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
  const { data } = await apiClient.post<{ id: number }>('/api/rental-listings', rentalListing, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  return data.id
}

async function uploadRentalListingImages(rentalListingId: number, images: Blob[], token: string) {
  const formData = new FormData()
  images.forEach(image => {
    formData.append('images', image)
  })
  await apiClient.post(`/api/rental-listings/${rentalListingId}/upload-images`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export { getRentalListings, createRentalListing, uploadRentalListingImages }
