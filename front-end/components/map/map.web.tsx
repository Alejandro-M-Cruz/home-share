import { MapProps } from './types'
import { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { latLng } from '@/helpers/lat-lng'
import { Location } from '@/types/location'
import { WEB_MAP } from '@/constants/map'

export function Map({ locations }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  })

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
      {locations.map(location => (
        <Marker
          key={location.id}
          position={latLng(location)}
          onClick={() => handleMarkerClick(location)}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  )
}
