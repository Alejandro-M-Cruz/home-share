import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapProps } from './types'
import { useState } from 'react'
import { Location } from '@/types/location'
import { NATIVE_MAP } from '@/constants/map'

export function Map({ locations }: MapProps) {
  const [region, setRegion] = useState(NATIVE_MAP.initialRegion)

  const handleMarkerPress = (markerLocation: Location) => {
    setRegion({ ...markerLocation, ...NATIVE_MAP.focusDeltas })
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: '100%' }}
      region={region}
      zoomControlEnabled={true}
    >
      {locations.map(location => (
        <Marker
          key={location.id}
          coordinate={location}
          title={location.street}
          onPress={() => handleMarkerPress(location)}
        />
      ))}
    </MapView>
  )
}
