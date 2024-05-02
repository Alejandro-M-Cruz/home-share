import { View } from 'react-native'
import { Map } from '@/components/Map'
import { LocationAutocomplete } from '@/components/LocationAutocomplete'
import { Label } from '@/components/Label'
import { CreateRentalListingLocation } from '@/types/rental-listing'
import { useState } from 'react'



export default function CreateRentalListingThirdStepScreen() {
  const [location, setLocation] = useState<Partial<CreateRentalListingLocation>>({
    country: '',
    state: '',
    city: '',
    postalCode: '',
    street: '',
    streetNumber: '',
    doorNumber: undefined,
    floorNumber: undefined,
    longitude: undefined,
    latitude: undefined
  })

  return (
    <View>
      <Label nativeID="location">Autocomplete location</Label>
      <LocationAutocomplete onLocationChange={() => {}} />
      {location.latitude && location.longitude && (
        <Map
          locations={[{
            street: location.street || undefined,
            longitude: location.longitude,
            latitude: location.latitude
          }]}
        />
      )}
    </View>
  )
}
