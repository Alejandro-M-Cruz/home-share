import { ScrollView, View } from 'react-native'
import { Map } from '@/components/Map'
import { LocationAutocomplete } from '@/components/LocationAutocomplete'
import { Label } from '@/components/Label'
import {
  CreateRentalListingLocation,
  CreateRentalListingRequest
} from '@/types/rental-listing'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { z } from 'zod'
import { useRentalListingStore } from '@/hooks/rental-listings/useRentalListingStore'
import { useCreateRentalListing } from '@/hooks/useCreateRentalListing'
import React, { useEffect, useMemo } from 'react'
import { Link, useRouter } from 'expo-router'
import { handleError } from '@/helpers/errors'
import { ErrorList } from '@/components/ErrorList'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const thirdStepSchema: z.ZodSchema<{ location: CreateRentalListingLocation }> =
  z.object({
    location: z.object({
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
  })

export default function CreateRentalListingSecondStepScreen() {
  const { rentalListing, patchRentalListing } = useRentalListingStore()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
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
    }
  })
  const location = watch('location')

  const { createRentalListing, status, error } = useCreateRentalListing()
  const router = useRouter()

  useEffect(() => {
    if (status === 'success') {
      router.push('/create-rental-listing/third-step')
    }
    if (error) {
      handleError({ error, setError })
    }
  }, [status, error, router, setError])

  const onSubmit = ({
    location
  }: {
    location: CreateRentalListingLocation
  }) => {
    const data = { ...rentalListing, location }
    patchRentalListing({ location })
    createRentalListing(data as CreateRentalListingRequest)
  }

  const otherErrors = useMemo(() => {
    if (!errors.location) {
      return errors
    }
    const { location: _, ...otherErrors } = errors
    return otherErrors
  }, [errors])

  return (
    <ScrollView className="flex-1 px-3 sm:px-8 py-6">
      <View className="flex flex-col gap-5 w-full max-w-[800px] mx-auto">
        <Label nativeID="location" required>
          Autocomplete location
        </Label>
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange } }) => (
            <LocationAutocomplete onLocationChange={onChange} />
          )}
        />

        {location.latitude && location.longitude && (
          <View className="w-full h-96 my-5">
            <Map
              locations={[
                {
                  street: location.street || undefined,
                  longitude: location.longitude,
                  latitude: location.latitude
                }
              ]}
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
        <Input
          placeholder="Select a location"
          readOnly
          value={location.country ?? ''}
        />
        {errors.location?.country && (
          <Text className="text-red-500">{errors.location.country.message}</Text>
        )}

        <Label nativeID="state" required>
          State / province
        </Label>
        <Input
          placeholder="Select a location"
          readOnly
          value={location.state ?? ''}
        />
        {errors.location?.state && (
          <Text className="text-red-500">{errors.location.state.message}</Text>
        )}

        <Label nativeID="city" required>
          City
        </Label>
        <Input
          placeholder="Select a location"
          readOnly
          value={location.city ?? ''}
        />
        {errors.location?.city && (
          <Text className="text-red-500">{errors.location.city.message}</Text>
        )}

        <Label nativeID="postalCode" required>
          Postal code
        </Label>
        <Input
          placeholder="Select a location"
          readOnly
          value={location.postalCode ?? ''}
        />
        {errors.location?.postalCode && (
          <Text className="text-red-500">
            {errors.location.postalCode.message}
          </Text>
        )}

        <Label nativeID="street" required>
          Street
        </Label>
        <Input
          placeholder="Select a location"
          readOnly
          value={location.street ?? ''}
        />
        {errors.location?.street && (
          <Text className="text-red-500">{errors.location.street.message}</Text>
        )}

        <Label nativeID="streetNumber" required>
          Street number
        </Label>
        <Input
          placeholder="Street number"
          readOnly
          value={location.streetNumber ?? ''}
        />
        {errors.location?.streetNumber && (
          <Text className="text-red-500">
            {errors.location.streetNumber.message}
          </Text>
        )}

        <Label nativeID="doorNumber">Door number</Label>
        <Controller
          control={control}
          name="location.doorNumber"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Door number"
              value={value ?? ''}
              onChangeText={text => onChange(text || undefined)}
            />
          )}
        />
        {errors.location?.doorNumber && (
          <Text className="text-red-500">
            {errors.location.doorNumber.message}
          </Text>
        )}

        <Label nativeID="floorNumber">Floor number</Label>
        <Controller
          control={control}
          name="location.floorNumber"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Floor number"
              value={value ?? ''}
              onChangeText={text => onChange(text || undefined)}
            />
          )}
        />
        {errors.location?.floorNumber && (
          <Text className="text-red-500">
            {errors.location.floorNumber.message}
          </Text>
        )}

        {(errors.location?.latitude || errors.location?.longitude) && (
          <Text className="text-red-500">
            Please select a location before submitting
          </Text>
        )}

        {Object.keys(otherErrors).length > 0 && (
          <ErrorList errors={otherErrors} />
        )}

        <View className="flex flex-row justify-around items-center mt-7">
          <Link href="/create-rental-listing/first-step">
            <Button variant="outline">
              <Text>Previous step</Text>
            </Button>
          </Link>
          <Button disabled={!isValid || status === 'pending'} onPress={handleSubmit(onSubmit)}>
            <Text>Next</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
