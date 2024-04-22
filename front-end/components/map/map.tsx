import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapProps } from '@/components/map/index'
import { useCallback, useState } from 'react'
import { Location } from '@/types/location'

const INITIAL_REGION = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 90,
  longitudeDelta: 90
}

const FOCUS_DELTAS = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
}

export function Map({ locations }: MapProps) {
  const [region, setRegion] = useState(INITIAL_REGION)

  const handleMarkerPress = (markerLocation: Location) => {
    setRegion({ ...markerLocation, ...FOCUS_DELTAS })
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
