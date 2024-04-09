import { useQuery } from '@tanstack/react-query'
import { getAmenities } from '@/services/amenity'

export function useAmenities() {
  const { data, error, status } = useQuery({
    queryKey: ['amenities'],
    queryFn: getAmenities,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })

  return {
    amenities: data,
    error,
    status
  }
}