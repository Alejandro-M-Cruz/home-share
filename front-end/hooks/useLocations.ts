import { useQuery } from '@tanstack/react-query'
import { getLocations } from '@/services/location'

export function useLocations() {
  const { data, error, status } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
    refetchOnWindowFocus: false
  })

  return {
    locations: data,
    error,
    status
  }
}
