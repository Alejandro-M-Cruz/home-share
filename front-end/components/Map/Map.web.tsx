import { useCallback, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { latLng } from '@/helpers/lat-lng'
import { WEB_MAP } from '@/constants/map'
import { useGoogleMapsForWeb } from '@/hooks/useGoogleMapsForWeb'
import { MapLocation, MapProps } from './types'

export function Map({ locations }: MapProps) {
  const { isLoaded } = useGoogleMapsForWeb()

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null)
  }, [])

  const handleMarkerClick = (markerLocation: MapLocation) => {
    map?.setCenter(latLng(markerLocation))
    map?.setZoom(WEB_MAP.focusZoom)
  }

  const handleMapClick = () => {}

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onLoad={onLoad}
      center={WEB_MAP.initialCenter}
      zoom={WEB_MAP.initialZoom}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {locations.map((location, i) => (
        <Marker
          key={location.id ?? i}
          position={latLng(location)}
          onClick={() => handleMarkerClick(location)}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  )
}
