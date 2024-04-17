import { useEffect, useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { useGoogleMaps } from '@/hooks/useGoogleMaps'
import { Location } from '@/types/location'

export function AddressAutocomplete() {
  const { isLoaded } = useGoogleMaps()
  const inputRef = useRef<HTMLInputElement | null>(null)

  function getAutocompleteLocation({
   address_components,
   geometry
  }: google.maps.places.PlaceResult): Partial<Location> {
    return {
      street: getComponent(address_components, 'route'),
      city: getComponent(address_components, 'locality') || getComponent(address_components, 'sublocality'),
      country: getComponent(address_components, 'country'),
      postalCode: getComponent(address_components, 'postal_code'),
      state: getComponent(address_components, 'administrative_area_level_1') ||
        getComponent(address_components, 'administrative_area_level_2'),
      latitude: geometry?.location?.lat(),
      longitude: geometry?.location?.lng()
    }
  }

  function getComponent(addressComponents: google.maps.GeocoderAddressComponent[] | undefined, type: string) {
    return addressComponents?.find(component => component.types.includes(type))?.long_name
  }

  useEffect(() => {
    if (inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode']
      })
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        console.log(getAutocompleteLocation(place))
      })
    }
  }, [inputRef.current])

  return isLoaded ? (
    <div style={{ flex: 1, flexDirection: 'column', gap: 6 }}>
      <label htmlFor="location">Location</label>
      <Autocomplete>
        <input type="text" placeholder="Type your location here" ref={inputRef} name="location"/>
      </Autocomplete>
    </div>
  ) : <p>Loading...</p>
}