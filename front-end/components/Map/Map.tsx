import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useState } from 'react'
import { NATIVE_MAP } from '@/constants/map'
import { MapLocation, MapProps } from './types'

export function Map({ locations }: MapProps) {
  const [region, setRegion] = useState(NATIVE_MAP.initialRegion)

  const handleMarkerPress = (markerLocation: MapLocation) => {
    setRegion({ ...markerLocation, ...NATIVE_MAP.focusDeltas })
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: '100%' }}
      region={region}
      zoomControlEnabled={true}
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
