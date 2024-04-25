import { RentalListing as RentalListingType } from '@/types/rental-listing'
import { Image, Text, View } from 'react-native'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Card'
import React from 'react'
import { ViewRef } from '@/primitives/types'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Badge } from '@/components/Badge'

type RentalListingProps = {
  rentalListing: RentalListingType
}

const displayTypes = {
  apartment: 'Apartment',
  house: 'House',
  apartment_block: 'Apartment block',
}

const RentalListing = React.forwardRef<
  ViewRef, React.ComponentPropsWithoutRef<typeof View> & RentalListingProps
>(({ rentalListing, ...props }, ref) => (
  <Card ref={ref} {...props}>
    <CardHeader className="gap-y-1 py-3 px-5">
      <View className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="flex-1 text-xl">{rentalListing.username}</CardTitle>
        <Badge variant="outline" className="me-2">
          <Text>{displayTypes[rentalListing.type]}</Text>
        </Badge>
        <MaterialIcons name="group-add" size={24} />
        <Text className="font-semibold text-lg">{rentalListing.availableRooms}</Text>
      </View>
      <Text className="text-neutral-500">Member since {rentalListing.userCreatedAt.split('T')[0]}</Text>
    </CardHeader>

    <CardContent className="p-0">
      {rentalListing.imageUrls && (
        <Image
          source={{ uri: rentalListing.imageUrls[0] }}
          className="w-full h-[240px] object-cover"
        />
      )}
    </CardContent>

    <CardFooter className="max-sm:mx-2 grid grid-cols-6 sm:grid-cols-12 gap-y-3 gap-x-3 py-3 px-5 flex-1">
      <Text className="font-light max-sm:text-center text-base text-neutral-600 col-span-12 sm:col-span-6">
        {rentalListing.street}, {rentalListing.streetNumber}
      </Text>

      <Text className="font-medium text-center sm:text-end text-neutral-500 col-span-12 sm:col-span-6">
        {rentalListing.city}, {rentalListing.state}, {rentalListing.country}
      </Text>

      <View className="flex flex-row items-center justify-center gap-2 col-span-12 sm:col-span-4 md:max-lg:col-span-6">
        <MaterialIcons name="shower" size={24} />
        <Text>{rentalListing.bathrooms} bathrooms</Text>
      </View>

      <View className="flex flex-row items-center justify-center gap-2 col-span-12 sm:col-span-4 md:max-lg:col-span-6">
        <MaterialCommunityIcons name="bed" size={24} />
        <Text>{rentalListing.bedrooms} bedrooms</Text>
      </View>

      <Text className="font-semibold text-base text-center col-span-12 sm:col-span-4 md:max-lg:col-span-12">
        ${rentalListing.monthlyRent.toFixed(2)}
        <Text className="font-semibold text-sm text-neutral-500"> / month</Text>
      </Text>
    </CardFooter>
  </Card>
))

RentalListing.displayName = 'RentalListing'

export { RentalListing }
