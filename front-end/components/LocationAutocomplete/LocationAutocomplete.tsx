import { Text } from '@/components/Text'
import * as React from 'react'
import { ViewRef } from '@/primitives/types'
import { LocationAutocompleteProps } from '@/components/LocationAutocomplete/types'
import { View } from 'react-native'

const LocationAutocomplete = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & LocationAutocompleteProps
>(({ onLocationChange, className, ...props }) => {
  return (
    <View className={className} {...props}>
      <Text>Not supported</Text>
    </View>
  )
})

LocationAutocomplete.displayName = 'LocationAutocomplete'

export { LocationAutocomplete }
