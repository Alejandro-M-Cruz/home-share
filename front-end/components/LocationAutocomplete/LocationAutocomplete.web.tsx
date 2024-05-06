import * as React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { useGoogleMapsForWeb } from '@/hooks/useGoogleMapsForWeb'
import { View } from 'react-native'
import { ViewRef } from '@/primitives/types'
import { LocationAutocompleteProps } from '@/components/LocationAutocomplete/types'
import { AntDesign } from '@expo/vector-icons'
import { getAutocompleteLocation } from '@/helpers/location-autocomplete'

const LocationAutocomplete = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & LocationAutocompleteProps
>(({ onLocationChange, className, ...props }, ref) => {
  const { isLoaded } = useGoogleMapsForWeb()
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (!isLoaded || !inputRef.current) {
      return
    }

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current!,
      {
        types: ['geocode']
      }
    )
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      onLocationChange(getAutocompleteLocation(place))
    })

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [isLoaded, inputRef.current, onLocationChange])

  return (
    <View ref={ref} className={className} {...props}>
      {isLoaded ? (
        <Autocomplete>
          <input
            className="web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
            type="text"
            placeholder="Select your location here"
            ref={inputRef}
            name="location"
          />
        </Autocomplete>
      ) : (
        <AntDesign
          name="loading1"
          size={24}
          className="my-3 mx-auto animate-spin"
        />
      )}
    </View>
  )
})

LocationAutocomplete.displayName = 'LocationAutocomplete'

export { LocationAutocomplete }
