import { apiClient } from '@/api/api-client'
import { Location } from '@/types/location'

type LocationsResponse = {
  data: Location[]
}

export async function getLocations(): Promise<Location[]> {
  const { data: { data: locations } } = await apiClient.get<LocationsResponse>('/api/locations')
  return locations
}
