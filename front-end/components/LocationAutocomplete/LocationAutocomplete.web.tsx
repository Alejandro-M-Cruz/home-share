import * as React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { useGoogleMapsForWeb } from '@/hooks/useGoogleMapsForWeb'
import { Location } from '@/types/location'
import { View } from 'react-native'
import { ViewRef } from '@/primitives/types'
import { LocationAutocompleteProps } from '@/components/LocationAutocomplete/types'
import { AntDesign } from '@expo/vector-icons'

const LocationAutocomplete = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & LocationAutocompleteProps
>(({ location, onLocationChange, className, ...props }, ref) => {
  const { isLoaded } = useGoogleMapsForWeb()
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  function getAutocompleteLocation({
    address_components,
    geometry
  }: google.maps.places.PlaceResult): Partial<Location> {
    return {
      street: getComponent(address_components, 'route'),
      city:
        getComponent(address_components, 'locality') ||
        getComponent(address_components, 'sublocality'),
      country: getComponent(address_components, 'country'),
      postalCode: getComponent(address_components, 'postal_code'),
      state:
        getComponent(address_components, 'administrative_area_level_1') ||
        getComponent(address_components, 'administrative_area_level_2'),
      latitude: geometry?.location?.lat(),
      longitude: geometry?.location?.lng()
    }
  }

  function getComponent(
    addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
    type: string
  ) {
    return addressComponents?.find(component => component.types.includes(type))
      ?.long_name
  }

  React.useEffect(() => {
    if (inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['geocode']
        }
      )
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        console.log(getAutocompleteLocation(place))
      })
    }
  }, [inputRef.current])

  return (
    <View ref={ref} className={className} {...props}>
      {isLoaded ? (
        <Autocomplete >
          <input
            className="web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
            type="text"
            placeholder="Type your location here"
            ref={inputRef}
            name="location"
          />
        </Autocomplete>
      ) : (
        <AntDesign name="loading1" size={24} className="my-3 mx-auto animate-spin" />
      )}
    </View>
  )
})

LocationAutocomplete.displayName = 'LocationAutocomplete'

export { LocationAutocomplete }
