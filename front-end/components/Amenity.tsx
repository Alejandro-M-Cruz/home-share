import { Amenity as AmenityType } from '@/types/amenity'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { ComponentPropsWithoutRef } from 'react'
import { ViewRef } from '@/primitives/types'
import { cn } from '@/helpers/cn'

type AmenityProps = ComponentPropsWithoutRef<typeof View> & {
  amenity: AmenityType
}

const Amenity = React.forwardRef<ViewRef, AmenityProps>(
  ({ amenity, className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn('flex flex-row items-center gap-3', className)} {...props}>
        <View className="rounded-full bg-primary p-1.5">
          <MaterialCommunityIcons
            name={amenity.icon as any}
            size={22}
            className="text-primary-foreground"
          />
        </View>
        <Text className="font-medium">{amenity.name}</Text>
      </View>
    )
  }
)

Amenity.displayName = 'Amenity'

export { Amenity }
