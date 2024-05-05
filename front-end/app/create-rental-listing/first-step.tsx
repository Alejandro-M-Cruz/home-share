import { Platform, ScrollView, View } from 'react-native'
import { useRentalListingStore } from '@/hooks/rental-listings/useRentalListingStore'
import { Controller, useForm } from 'react-hook-form'
import {
  CreateRentalListingRequest,
  RentalListingType
} from '@/types/rental-listing'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { useRouter } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/Select'
import { useAmenities } from '@/hooks/useAmenities'
import { Checkbox } from '@/components/Checkbox'
import { Amenity } from '@/components/Amenity'
import { Label } from '@/components/Label'
import { cn } from '@/helpers/cn'
import { AntDesign } from '@expo/vector-icons'
import { textToFloat, textToInt } from '@/helpers/numbers'

const firstStepSchema: z.ZodSchema<Partial<CreateRentalListingRequest>> =
  z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    type: z.enum(['apartment', 'house', 'apartment_block']),
    monthlyRent: z.number().min(0),
    availableRooms: z.number().int().min(1),
    size: z.number().int().min(0),
    bathrooms: z.number().int().min(0).max(255),
    bedrooms: z.number().int().min(0).max(255),
    amenities: z.array(z.string()),
    yearBuilt: z.number().int().min(1000).max(new Date().getFullYear()),
    rules: z.string().optional(),
    additionalInformation: z.string().optional()
  })

export default function CreateRentalListingFirstStepScreen() {
  const { rentalListing, patchRentalListing } = useRentalListingStore()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Partial<CreateRentalListingRequest>>({
    resolver: zodResolver(firstStepSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'apartment',
      monthlyRent: undefined,
      availableRooms: undefined,
      size: undefined,
      bathrooms: undefined,
      bedrooms: undefined,
      yearBuilt: undefined,
      amenities: [],
      ...rentalListing
    },
    mode: 'onChange'
  })

  const { amenities, error, status } = useAmenities()

  const onSubmit = (data: Partial<CreateRentalListingRequest>) => {
    patchRentalListing(data)
    router.push('/create-rental-listing/second-step')
  }

  const typeLabels: Record<RentalListingType, string> = useMemo(
    () => ({
      apartment: 'Apartment',
      house: 'House',
      apartment_block: 'Apartment block'
    }),
    []
  )

  return (
    <ScrollView
      className="flex-1 px-2 sm:px-8 py-4"
      contentContainerClassName="flex flex-col space-y-4"
    >
      <Label nativeID="title" required>Title</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="text"
          />
        )}
        name="title"
      />
      {errors.title && (
        <Text className="mb-2 text-red-500">{errors.title.message}</Text>
      )}

      <Label nativeID="description" required>Description</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Textarea
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="text"
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text className="mb-2 text-red-500">{errors.description.message}</Text>
      )}

      <Label nativeID="type" required>Type of Home</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            value={{
              value: value as string,
              label: typeLabels[value as RentalListingType]
            }}
            onOpenChange={isOpen => !isOpen && onBlur()}
            onValueChange={option => onChange(option?.value)}
            className="z-50"
          >
            <SelectTrigger>
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Type of home"
              />
            </SelectTrigger>
            <SelectContent withPortal={Platform.OS !== 'web'} className="z-50">
              {Object.entries(typeLabels).map(([value, label]) => (
                <SelectItem value={value} label={label} key={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        name="type"
      />
      {errors.type && (
        <Text className="mb-2 text-red-500">{errors.type.message}</Text>
      )}

      <Label nativeID="monthlyRent" required>Monthly Rent</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Monthly rent"
            onBlur={onBlur}
            onChangeText={text => onChange(textToFloat(text))}
            value={value?.toString() ?? ''}
            inputMode="numeric"
          />
        )}
        name="monthlyRent"
      />
      {errors.monthlyRent && (
        <Text className="mb-2 text-red-500">{errors.monthlyRent.message}</Text>
      )}

      <Label nativeID="availableRooms" required>Available Rooms</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Available rooms"
            onBlur={onBlur}
            onChangeText={text => onChange(textToInt(text))}
            value={value?.toString() ?? ''}
            inputMode="numeric"
          />
        )}
        name="availableRooms"
      />
      {errors.availableRooms && (
        <Text className="mb-2 text-red-500">
          {errors.availableRooms.message}
        </Text>
      )}

      <Label nativeID="size" required>Size</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Size"
            onBlur={onBlur}
            onChangeText={text => onChange(textToInt(text))}
            value={value?.toString() ?? ''}
            inputMode="numeric"
          />
        )}
        name="size"
      />
      {errors.size && (
        <Text className="mb-2 text-red-500">{errors.size.message}</Text>
      )}

      <Label nativeID="bathrooms" required>Bathrooms</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Bathrooms"
            onBlur={onBlur}
            onChangeText={text => onChange(textToInt(text))}
            value={value?.toString() ?? ''}
            inputMode="numeric"
          />
        )}
        name="bathrooms"
      />
      {errors.bathrooms && (
        <Text className="mb-2 text-red-500">{errors.bathrooms.message}</Text>
      )}

      <Label nativeID="bedrooms" required>Bedrooms</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Bedrooms"
            onBlur={onBlur}
            onChangeText={text => onChange(textToInt(text))}
            value={value?.toString() ?? ''}
            inputMode="numeric"
          />
        )}
        name="bedrooms"
      />
      {errors.bedrooms && (
        <Text className="mb-2 text-red-500">{errors.bedrooms.message}</Text>
      )}

      <Label nativeID="yearBuilt" required>Year Built</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Year built"
            onBlur={onBlur}
            onChangeText={text => onChange(textToInt(text))}
            value={value?.toString() ?? ''}
            inputMode="numeric"
          />
        )}
        name="yearBuilt"
      />
      {errors.yearBuilt && (
        <Text className="mb-2 text-red-500">{errors.yearBuilt.message}</Text>
      )}

      <Label nativeID="rules">Rules</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Textarea
            placeholder="Rules"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="text"
          />
        )}
        name="rules"
      />

      <Label nativeID="additionalInformation">Additional Information</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Textarea
            placeholder="Additional information"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="text"
          />
        )}
        name="additionalInformation"
      />

      <Label nativeID="amenities">Amenities</Label>
      {status === 'success' && amenities && (
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 sm:gap-x-5 md:gap-x-10 gap-y-4">
              {amenities?.map(amenity => (
                <View
                  key={amenity.id}
                  className="flex flex-row items-center space-x-3"
                >
                  <Checkbox
                    checked={value?.includes(amenity.slug) ?? false}
                    onCheckedChange={checked => {
                      if (checked) {
                        onChange([...(value ?? []), amenity.slug])
                      } else {
                        onChange(
                          (value ?? []).filter(slug => slug !== amenity.slug)
                        )
                      }
                    }}
                  />
                  <Amenity amenity={amenity} />
                </View>
              ))}
            </View>
          )}
          name="amenities"
        />
      )}
      {status === 'pending' && (
        <AntDesign
          className={cn('my-4 mx-auto animate-spin')}
          name="loading1"
          size={24}
        />
      )}
      {status === 'error' && (
        <Text className="text-red-500">
          There has been an unexpected error, please try again later
        </Text>
      )}

      <Button
        variant="outline"
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Next</Text>
      </Button>
    </ScrollView>
  )
}
