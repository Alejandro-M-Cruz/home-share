import { csrf } from '@/services/auth'
import { apiClient } from '@/services/api-client'
import { Amenity } from '@/types/amenity'

type AmenitiesResponse = {
  id: number
  name: string
  icon: string
  created_at: string
  updated_at: string
}[]

export async function getAmenities(): Promise<Amenity[]> {
  await csrf()
  const { data } = await apiClient.get<AmenitiesResponse>('/api/amenities')
  return data.map(amenity => ({
    ...amenity,
    createdAt: amenity.created_at,
    updatedAt: amenity.updated_at
  }))
}
