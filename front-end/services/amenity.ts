import { csrf } from '@/services/auth'
import { apiClient } from '@/api/api-client'
import { Amenity } from '@/types/amenity'

export async function getAmenities(): Promise<Amenity[]> {
  await csrf()
  const { data } = await apiClient.get<Amenity[]>('/api/amenities')
  return data
}
