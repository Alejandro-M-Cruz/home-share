import { useCallback, useEffect, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { latLng } from '@/helpers/lat-lng'
import { WEB_MAP } from '@/constants/map'
import { useGoogleMapsForWeb } from '@/hooks/useGoogleMapsForWeb'
import { MapLocation, MapProps } from './types'
import { AntDesign } from '@expo/vector-icons'

export function Map({ locations, initialCenter, onLocationChange, initialZoom }: MapProps) {
  const { isLoaded } = useGoogleMapsForWeb()

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((googleMap: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()
    googleMap.fitBounds(bounds)
    setMap(googleMap)
  }, [])

  useEffect(() => {
    if (!map) {
      return
    }
    setTimeout(() => {
      map.setCenter(latLng(initialCenter ?? WEB_MAP.initialCenter))
      map.setZoom(initialZoom ?? WEB_MAP.initialZoom)
    }, 500)
  }, [map])

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
      mapContainerClassName="w-full h-full"
      onLoad={onLoad}
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
    <AntDesign name="loading1" className="mx-auto my-[120px]" size={24} />
  )
}
