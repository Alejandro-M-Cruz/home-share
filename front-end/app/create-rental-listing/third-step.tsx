import { ScrollView, View } from 'react-native'
import { Map } from '@/components/Map'
import { LocationAutocomplete } from '@/components/LocationAutocomplete'
import { Label } from '@/components/Label'
import { CreateRentalListingLocation, CreateRentalListingRequest } from '@/types/rental-listing'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { z } from 'zod'
import { useRentalListingStore } from '@/hooks/useRentalListingStore'
import { useCreateRentalListing } from '@/hooks/useCreateRentalListing'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'expo-router'
import { handleError } from '@/helpers/errors'
import { ErrorList } from '@/components/ErrorList'

const thirdStepSchema: z.ZodSchema<CreateRentalListingLocation> = z.object({
  country: z.string(),
  state: z.string(),
  city: z.string(),
  postalCode: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  doorNumber: z.string().optional(),
  floorNumber: z.string().optional(),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90)
})

export default function CreateRentalListingThirdStepScreen() {
  const { rentalListing, patchRentalListing } = useRentalListingStore()
  const [location, setLocation] = useState<Partial<CreateRentalListingLocation>>(rentalListing.location ?? {
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

  const [errors, setErrors] = useState<any>({})
  const setError = (field: string, error: any) => {
    setErrors((prev: any) => ({
      ...prev,
      [field]: error
    }))
  }

  const [isValid, setIsValid] = useState(false)
  useEffect(() => {
    try {
      thirdStepSchema.parse(location)
      setErrors(undefined)
      setIsValid(true)
    } catch {
      setIsValid(false)
    }
  }, [location])

  const { createRentalListing, status, error } = useCreateRentalListing()
  const router = useRouter()

  useEffect(() => {
    if (status === 'success') {
      router.push('/my-rental-listings')
    }
    if (error) {
      handleError({ error, setError })
    }
  }, [status, error, router, setError])

  const onSubmit = (location: CreateRentalListingLocation) => {
    console.log(location)
    patchRentalListing({ location })
    createRentalListing(rentalListing as CreateRentalListingRequest)
  }

  const otherErrors = useMemo(() => {
    const { location: _, ...otherErrors } = errors
    return otherErrors
  }, [errors])

  return (
    <ScrollView className="flex-1" contentContainerClassName="flex flex-col py-4 px-2 sm:px-4 space-y-6">
      <Label nativeID="location" required>Autocomplete location</Label>
      <LocationAutocomplete onLocationChange={loc => setLocation(prev => ({
        ...loc,
        doorNumber: prev.doorNumber,
        floorNumber: prev.floorNumber
      }))} />

      {location.latitude && location.longitude && (
        <View className="w-full h-96 my-5">
          <Map
            locations={[{
              street: location.street || undefined,
              longitude: location.longitude,
              latitude: location.latitude
            }]}
            initialCenter={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            initialZoom={18}
          />
        </View>
      )}

      <Label nativeID="country" required>
        Country
      </Label>
      <Input placeholder="Select a location" readOnly value={location.country ?? ''} />
      {errors.location?.country && (
        <Text className="text-red-500">{errors.location.country.message}</Text>
      )}

      <Label nativeID="state" required>
        State / province
      </Label>
      <Input placeholder="Select a location" readOnly value={location.state ?? ''} />
      {errors.location?.state && (
        <Text className="text-red-500">{errors.location.state.message}</Text>
      )}

      <Label nativeID="city" required>
        City
      </Label>
      <Input placeholder="Select a location" readOnly value={location.city ?? ''} />
      {errors.location?.city && (
        <Text className="text-red-500">{errors.location.city.message}</Text>
      )}

      <Label nativeID="postalCode" required>
        Postal code
      </Label>
      <Input placeholder="Select a location" readOnly value={location.postalCode ?? ''} />
      {errors.location?.postalCode && (
        <Text className="text-red-500">{errors.location.postalCode.message}</Text>
      )}

      <Label nativeID="street" required>
        Street
      </Label>
      <Input placeholder="Select a location" readOnly value={location.street ?? ''} />
      {errors.location?.street && (
        <Text className="text-red-500">{errors.location.street.message}</Text>
      )}

      <Label nativeID="streetNumber" required>
        Street number
      </Label>
      <Input placeholder="Street number" readOnly value={location.streetNumber ?? ''} />
      {errors.location?.streetNumber && (
        <Text className="text-red-500">{errors.location.streetNumber.message}</Text>
      )}

      <Label nativeID="doorNumber">
        Door number
      </Label>
      <Input
        placeholder="Door number"
        value={location.doorNumber ?? ''}
        onChangeText={text => setLocation(prev => ({
          ...prev,
          doorNumber: text || undefined
        }))}
      />
      {errors.location?.doorNumber && (
        <Text className="text-red-500">{errors.location.doorNumber.message}</Text>
      )}

      <Label nativeID="floorNumber">
        Floor number
      </Label>
      <Input
        placeholder="Floor number"
        value={location.floorNumber ?? ''}
        onChangeText={text => setLocation(prev => ({
          ...prev,
          floorNumber: text || undefined
        }))}
      />
      {errors.location?.floorNumber && (
        <Text className="text-red-500">{errors.location.floorNumber.message}</Text>
      )}

      {(errors.location?.latitude || errors.location?.longitude) && (
        <Text className="text-red-500">Please select a location before submitting</Text>
      )}

      {Object.keys(otherErrors).length > 0 && (
        <ErrorList errors={otherErrors} />
      )}
      <Button onPress={() => onSubmit(location as CreateRentalListingLocation)} disabled={!isValid}>
        <Text>Confirm</Text>
      </Button>
    </ScrollView>
  )
}
