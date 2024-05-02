import { useJsApiLoader } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader'

const googleMapsLibraries: Library[] = ['places']

export function useGoogleMapsForWeb() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: googleMapsLibraries
  })

  return {
    isLoaded,
    loadError
  }
}
