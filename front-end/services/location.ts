import { apiClient } from '@/api/api-client'
import { Location } from '@/types/location'

export async function getLocations(): Promise<Location[]> {
  const { data } = await apiClient.get<Location[]>('/api/locations')
  return data
}
