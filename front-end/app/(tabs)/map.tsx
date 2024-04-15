import { Text, View } from 'react-native'
import { Map } from '@/components/map'
import { useLocations } from '@/hooks/useLocations'

export default function RentalListingMap() {
  const { locations, error, status } = useLocations()

  return (
    <View style={{ flex: 1 }}>
      {status === 'success' && locations ? (
        <Map locations={locations} />
      ) : (
        <Text>{error?.message ?? 'Loading...'}</Text>
      )}
    </View>
  )
}
