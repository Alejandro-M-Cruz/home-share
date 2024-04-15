import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapProps } from '@/components/map/index'

export function Map({ locations }: MapProps) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: '100%' }}
    >
      {locations.map((location) => (
        <Marker key={location.id} coordinate={location} title={location.street} />
      ))}
    </MapView>
  )
}
