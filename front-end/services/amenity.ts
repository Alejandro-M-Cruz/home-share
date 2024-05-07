import { csrf } from '@/services/auth'
import { apiJsonClient } from '@/api/api-client'
import { Amenity } from '@/types/amenity'

export async function getAmenities(): Promise<Amenity[]> {
  await csrf()
  const { data } = await apiJsonClient.get<Amenity[]>('/api/amenities')
  return data
}
