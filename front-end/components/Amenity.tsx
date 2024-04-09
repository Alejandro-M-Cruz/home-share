import { Amenity as AmenityType } from '@/types/amenity'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type AmenityProps= {
  amenity: AmenityType
}

export function Amenity({ amenity }: AmenityProps) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
      <MaterialCommunityIcons name={amenity.icon as any} size={24} color="black" />
      <Text>{amenity.name}</Text>
    </View>
  )
}
