import { CreateRentalListingLocation } from '@/types/rental-listing'

function getAutocompleteLocation({
  address_components,
  geometry
}: google.maps.places.PlaceResult): Partial<CreateRentalListingLocation> {
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
  return addressComponents
    ?.find(component => component.types.includes(type))
    ?.long_name
}

export { getAutocompleteLocation }
