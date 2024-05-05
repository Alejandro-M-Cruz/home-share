import { RentalListing as RentalListingType } from '@/types/rental-listing'
import { Text, View } from 'react-native'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/Card'
import * as React from 'react'
import { ViewRef } from '@/primitives/types'
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { Badge } from '@/components/Badge'
import { Carousel } from '@/components/Carousel'

type RentalListingProps = {
  rentalListing: RentalListingType
  variant?: 'default' | 'my_rental_listing'
}

const displayTypes = {
  apartment: 'Apartment',
  house: 'House',
  apartment_block: 'Apartment block'
}

const RentalListing = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & RentalListingProps
>(({ rentalListing, variant = 'default', ...props }, ref) => (
  <Card ref={ref} {...props}>
    <CardHeader className="gap-y-1 py-3 px-5">
      <View className="flex flex-row items-center justify-end gap-2">
        <CardTitle className="flex-1 text-xl max-sm:hidden truncate">
          {variant === 'default' ? rentalListing.username : rentalListing.title}
        </CardTitle>
        <Badge variant="outline" className="me-2 max-sm:flex-1">
          <Text>{displayTypes[rentalListing.type]}</Text>
        </Badge>
        <MaterialIcons name="group-add" size={24} />
        <Text className="font-semibold text-lg">
          {rentalListing.availableRooms}
        </Text>
      </View>
      <CardTitle className="flex-1 text-xl sm:hidden">
        {variant === 'default' ? rentalListing.username : rentalListing.title}
      </CardTitle>
      <Text className="text-neutral-500">
        {variant === 'default' ?
          `Member since ${rentalListing.userCreatedAt.split('T')[0]}` :
          `Created on ${rentalListing.createdAt.split('T')[0]}`}
      </Text>
    </CardHeader>

    <CardContent className="p-0 relative group">
      {rentalListing.imageUrls.length > 0 ? (
        <Carousel
          imageUrls={rentalListing.imageUrls}
          imageClassName="w-full h-[240px]"
        />
      ) : (
        <View className="w-full h-[240px] bg-neutral-100 flex items-center justify-center">
          <MaterialCommunityIcons name="image-broken-variant" size={64} />
        </View>
      )}
    </CardContent>

    <CardFooter className="max-sm:mx-2 grid grid-cols-6 sm:grid-cols-12 gap-y-3 gap-x-3 py-3 px-5 flex-1">
      <Text className="font-light max-sm:text-center text-base text-neutral-600 col-span-12 sm:col-span-6">
        {rentalListing.street}, {rentalListing.streetNumber}
      </Text>

      <Text className="font-medium text-center sm:text-end text-neutral-500 col-span-12 sm:col-span-6">
        {rentalListing.city}, {rentalListing.state}, {rentalListing.country}
      </Text>

      <View className="flex flex-row items-center justify-center gap-2 col-span-12 sm:col-span-6 xl:col-span-4">
        <MaterialIcons name="shower" size={24} />
        <Text>
          {rentalListing.bathrooms} bathroom
          {rentalListing.bathrooms === 1 ? '' : 's'}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-center gap-2 col-span-12 sm:col-span-6 xl:col-span-4">
        <MaterialCommunityIcons name="bed" size={24} />
        <Text>
          {rentalListing.bedrooms} bedroom
          {rentalListing.bedrooms === 1 ? '' : 's'}
        </Text>
      </View>

      <Text className="font-semibold text-base text-center col-span-12 xl:col-span-4">
        ${rentalListing.monthlyRent.toFixed(2)}
        <Text className="font-semibold text-sm text-neutral-500">
          {' '}
          / month
        </Text>
      </Text>
    </CardFooter>
  </Card>
))

RentalListing.displayName = 'RentalListing'

export { RentalListing }
