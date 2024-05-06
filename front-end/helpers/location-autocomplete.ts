import { CreateRentalListingLocation } from '@/types/rental-listing'

function getAutocompleteLocation({
  address_components,
  geometry
}: google.maps.places.PlaceResult): Partial<CreateRentalListingLocation> {
  if (!address_components) {
    return {}
  }
  const ac = new AddressComponents(address_components)
  const postalCodeSuffix = ac.get('postal_code_suffix')
  return {
    street: ac.get('route'),
    city: ac.get(
      'locality',
      'sublocality',
      'neighborhood',
      'sublocality_level_1',
      'sublocality_level_2',
      'sublocality_level_3',
      'sublocality_level_4',
      'sublocality_level_5',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'administrative_area_level_4',
      'administrative_area_level_5',
      'administrative_area_level_6',
      'administrative_area_level_7'
    ),
    country: ac.get('country'),
    postalCode:
      ac.get('postal_code') + (postalCodeSuffix ? `-${postalCodeSuffix}` : ''),
    state: ac.get(
      'administrative_area_level_1',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'administrative_area_level_4',
      'administrative_area_level_5',
      'administrative_area_level_6',
      'administrative_area_level_7'
    ),
    latitude: geometry?.location?.lat(),
    longitude: geometry?.location?.lng(),
    streetNumber: ac.get('street_number')
  }
}

function getComponent(
  addressComponents: google.maps.GeocoderAddressComponent[] | undefined,
  types: string[]
) {
  return addressComponents?.find(component =>
    types.some(type => component.types.includes(type))
  )?.long_name
}

class AddressComponents {
  constructor(
    private addressComponents: google.maps.GeocoderAddressComponent[]
  ) {}

  /**
   * Get the long name of the first address component that matches any of the types, or undefined if none match. It will
   * try to find the first match in the order of the given types.
   * @param types
   */
  get(...types: string[]) {
    return this.addressComponents?.find(component =>
      types.some(type => component.types.includes(type))
    )?.long_name
  }
}

export { getAutocompleteLocation }
