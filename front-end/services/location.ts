import { apiClient } from '@/api/api-client'
import { Location } from '@/types/location'
import { RentalListing } from '@/types/rental-listing'

type LocationsResponse = {
  data: Location[]
}

async function getLocations(): Promise<Location[]> {
  const {
    data: { data: locations }
  } = await apiClient.get<LocationsResponse>('/api/locations')
  return locations
}

async function getRentalListingByLocationId(locationId: number): Promise<RentalListing> {
  const {
    data: { data: rentalListing }
  } = await apiClient.get<{ data: RentalListing }>(`/api/locations/${locationId}`)
  return rentalListing
}

export {
  getLocations,
  getRentalListingByLocationId
}
