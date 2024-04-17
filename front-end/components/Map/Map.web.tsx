import { useCallback, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { latLng } from '@/helpers/lat-lng'
import { Location } from '@/types/location'
import { MapProps } from '@/components/AddressAutocomplete'
import { useGoogleMaps } from '@/hooks/useGoogleMaps'

const INITIAL_CENTER = { lat: 20, lng: 0 }
const INITIAL_ZOOM = 2.4
const FOCUS_ZOOM = 18
const ENDED_FOCUS_ZOOM = 15

export function Map({ locations }: MapProps){
  const { isLoaded } = useGoogleMaps()
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null)
  }, [])

  const handleMarkerClick = (markerLocation: Location) => {
    map?.setCenter(latLng(markerLocation))
    map?.setZoom(FOCUS_ZOOM)
  }

  const handleMapClick = () => {
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onLoad={onLoad}
      center={INITIAL_CENTER}
      zoom={INITIAL_ZOOM}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {locations.map(location => (
        <Marker key={location.id} position={latLng(location)} onClick={() => handleMarkerClick(location)} />
      ))}
    </GoogleMap>
  ) : <p>Loading...</p>
}
