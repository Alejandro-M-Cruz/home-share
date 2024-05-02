import { ScrollView, View } from 'react-native'
import { Map } from '@/components/Map'
import { LocationAutocomplete } from '@/components/LocationAutocomplete'
import { Label } from '@/components/Label'
import { CreateRentalListingLocation, CreateRentalListingRequest } from '@/types/rental-listing'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRentalListingStore } from '@/hooks/useRentalListingStore'
import { useCreateRentalListing } from '@/hooks/useCreateRentalListing'
import { useEffect, useMemo } from 'react'
import { useRouter } from 'expo-router'
import { handleError } from '@/helpers/errors'
import { ErrorList } from '@/components/ErrorList'

const thirdStepSchema: z.ZodSchema<{ location: CreateRentalListingLocation }> = z.object({
  location: z.object({
    country: z.string(),
    state: z.string(),
    city: z.string(),
    postalCode: z.string(),
    street: z.string(),
    streetNumber: z.string(),
    doorNumber: z.string().optional(),
    floorNumber: z.string().optional(),
    longitude: z.number(),
    latitude: z.number()
  })
})

export default function CreateRentalListingThirdStepScreen() {
  const { rentalListing, patchRentalListing } = useRentalListingStore()
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
    watch
  } = useForm<{ location: CreateRentalListingLocation }>({
    resolver: zodResolver(thirdStepSchema),
    defaultValues: {
      location: rentalListing.location ?? {
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
      }
    },
    mode: 'onChange'
  })
  const location = watch('location')

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

  const onSubmit = ({ location }: { location: CreateRentalListingLocation }) => {
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
      <LocationAutocomplete
        onLocationChange={location => setValue('location', location as any)} />

      <Label nativeID="country" required>
        Country
      </Label>
      <Input placeholder="Select a location" readOnly value={location.country ?? ''} />
      {errors.location?.country && (
        <Text className="text-danger-500">{errors.location.country.message}</Text>
      )}

      <Label nativeID="state" required>
        State / province
      </Label>
      <Input placeholder="Select a location" readOnly value={location.state ?? ''} />
      {errors.location?.state && (
        <Text className="text-danger-500">{errors.location.state.message}</Text>
      )}

      <Label nativeID="city" required>
        City
      </Label>
      <Input placeholder="Select a location" readOnly value={location.city ?? ''} />
      {errors.location?.city && (
        <Text className="text-danger-500">{errors.location.city.message}</Text>
      )}

      <Label nativeID="postalCode" required>
        Postal code
      </Label>
      <Input placeholder="Select a location" readOnly value={location.postalCode ?? ''} />
      {errors.location?.postalCode && (
        <Text className="text-danger-500">{errors.location.postalCode.message}</Text>
      )}

      <Label nativeID="street" required>
        Street
      </Label>
      <Input placeholder="Select a location" readOnly value={location.street ?? ''} />
      {errors.location?.street && (
        <Text className="text-danger-500">{errors.location.street.message}</Text>
      )}

      <Label nativeID="streetNumber" required>
        Street number
      </Label>
      <Input placeholder="Street number" readOnly value={location.streetNumber ?? ''} />
      {errors.location?.streetNumber && (
        <Text className="text-danger-500">{errors.location.streetNumber.message}</Text>
      )}

      <Label nativeID="doorNumber">
        Door number
      </Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Door number"
            onChangeText={text => onChange(text || undefined)}
            onBlur={onBlur}
            value={value ?? ''}
          />
        )}
        name="location.doorNumber"
      />
      {errors.location?.doorNumber && (
        <Text className="text-danger-500">{errors.location.doorNumber.message}</Text>
      )}

      <Label nativeID="floorNumber">
        Floor number
      </Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Floor number"
            onChangeText={text => onChange(text || undefined)}
            onBlur={onBlur}
            value={value ?? ''}
          />
        )}
        name="location.floorNumber"
      />
      {errors.location?.floorNumber && (
        <Text className="text-danger-500">{errors.location.floorNumber.message}</Text>
      )}

      {(errors.location?.latitude || errors.location?.longitude) && (
        <Text className="text-danger-500">Please select a location before submitting</Text>
      )}

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
      {Object.keys(otherErrors).length > 0 && (
        <ErrorList errors={otherErrors} />
      )}
      <Button onPress={handleSubmit(onSubmit)} disabled={!isValid}>
        <Text>Confirm</Text>
      </Button>
    </ScrollView>
  )
}
