import { useCallback, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { latLng } from '@/helpers/lat-lng'
import { WEB_MAP } from '@/constants/map'
import { useGoogleMapsForWeb } from '@/hooks/useGoogleMapsForWeb'
import { MapLocation, MapProps } from './types'

export function Map({ locations, initialCenter, onLocationChange, initialZoom }: MapProps) {
  const { isLoaded } = useGoogleMapsForWeb()

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback((_map: google.maps.Map) => {
    setMap(null)
  }, [])

  const handleMarkerClick = (markerLocation: MapLocation) => {
    map?.setCenter(latLng(markerLocation))
    map?.setZoom(WEB_MAP.focusZoom)
    onLocationChange?.(markerLocation)
  }

  const handleMapClick = () => {
    onLocationChange?.(undefined)
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onLoad={onLoad}
      center={latLng(initialCenter ?? WEB_MAP.initialCenter)}
      zoom={initialZoom ?? WEB_MAP.initialZoom}
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
