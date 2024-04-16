import { MapProps } from '@/components/map/index'
import { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

export function Map({ locations }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onLoad={onLoad}
      center={{ lat: 0, lng: 0 }}
      zoom={3}
      onUnmount={onUnmount}
    >
      {locations.map(({ id, latitude, longitude }) => (
        <Marker key={id} position={{ lat: latitude, lng: longitude }} />
      ))}
    </GoogleMap>
  ) : <></>
}
