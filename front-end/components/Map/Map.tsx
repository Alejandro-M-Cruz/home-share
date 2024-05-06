import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useState } from 'react'
import { NATIVE_MAP } from '@/constants/map'
import { MapLocation, MapProps } from './types'
import { zoomToDeltas } from '@/helpers/lat-lng'

export function Map({ locations, initialCenter, initialZoom, onLocationChange }: MapProps) {
  const [region, setRegion] = useState({
    ...NATIVE_MAP.initialRegion,
    ...(initialCenter ?? {}),
    ...(initialZoom ? zoomToDeltas(initialZoom) : {})
  })

  const handleMarkerPress = (markerLocation: MapLocation) => {
    setRegion({ ...markerLocation, ...NATIVE_MAP.focusDeltas })
    onLocationChange?.(markerLocation)
  }

  const handleMapPress = () => {
    onLocationChange?.(undefined)
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: '100%' }}
      region={region}
      zoomControlEnabled={true}
      onPress={handleMapPress}
    >
      {locations.map((location, i) => (
        <Marker
          key={location.id ?? i}
          coordinate={location}
          title={location.street}
          onPress={() => handleMarkerPress(location)}
        />
      ))}
    </MapView>
  )
}
