import { Amenity as AmenityType } from '@/types/amenity'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { ComponentPropsWithoutRef } from 'react'
import { ViewRef } from '@/primitives/types'

type AmenityProps = ComponentPropsWithoutRef<typeof View> & {
  amenity: AmenityType
  className?: string
}

const Amenity = React.forwardRef<ViewRef, AmenityProps>(
  ({ amenity, className }, ref) => {
    return (
      <View ref={ref} className="flex flex-row items-center gap-3">
        <View className="rounded-full bg-indigo-600 p-1.5">
          <MaterialCommunityIcons
            name={amenity.icon as any}
            size={22}
            color="white"
          />
        </View>
        <Text className="font-medium">{amenity.name}</Text>
      </View>
    )
  }
)

Amenity.displayName = 'Amenity'

export { Amenity }
