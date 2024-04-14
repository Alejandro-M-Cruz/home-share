import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export function Map() {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
