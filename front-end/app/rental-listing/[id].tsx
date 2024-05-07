import { useGetRentalListingDetails } from '@/hooks/rental-listings/useGetRentalListingDetails'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/Text'
import { Carousel } from '@/components/Carousel'
import { Button } from '@/components/Button'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Map } from '@/components/Map'
import { Amenity } from '@/components/Amenity'
import * as React from 'react'
import { sizeUnitLabels, typeLabels } from '@/constants/labels'
import { Badge } from '@/components/Badge'

export default function RentalListingDetailsScreen() {
  const params = useLocalSearchParams()
  const idStr = params.id as string
  const { rentalListingDetails, error, status } = useGetRentalListingDetails(
    parseInt(idStr)
  )

  if (!idStr || isNaN(parseInt(idStr))) {
    return <Redirect href="/" />
  }

  return (
    <ScrollView className="flex-1">
      {rentalListingDetails && (
        <>
          <View className="flex flex-col gap-y-3 mx-auto px-4 md:px-12 pt-4 pb-10 w-full max-w-[1200px]">
            <View className="w-full flex flex-col gap-3 md:flex-row items-center justify-center">
              {rentalListingDetails.imageUrls.length === 0 ? (
                <View className="max-md:w-full md:flex-1 h-[300px] bg-neutral-100 flex items-center justify-center">
                  <MaterialCommunityIcons name="image-broken-variant" size={64} />
                </View>
              ) : (
                <Carousel
                  className="max-md:w-full md:flex-1 rounded-xl"
                  imageClassName="w-full h-[300px] rounded-xl"
                  imageUrls={rentalListingDetails.imageUrls}
                />
              )}
              <View className="max-md:w-full md:flex-1 h-[300px]">
                <Map
                  locations={[rentalListingDetails]}
                  initialCenter={{
                    latitude: rentalListingDetails.latitude,
                    longitude: rentalListingDetails.longitude
                  }}
                  initialZoom={15}
                />
              </View>
            </View>

            <View className="flex flex-col sm:flex-row gap-3 items-center">
              <Text className="text-lg font-medium text-neutral-600">
                Uploaded on {new Date(rentalListingDetails.createdAt).toLocaleDateString()} by {rentalListingDetails.username}
              </Text>
              <Text className="text-base text-neutral-500 flex-grow" >
                (member since {new Date(rentalListingDetails.userCreatedAt).toLocaleDateString()})
              </Text>
              <View className="flex flex-row flex-wrap items-center justify-center">
                <Text className="font-semibold text-xl text-center">
                  ${rentalListingDetails.monthlyRent.toFixed(2)}
                </Text>
                <Text className="font-semibold text-lg text-neutral-500">
                  {' '}
                  / month
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center justify-around flex-wrap mt-2 w-full gap-7">
              <View className="flex flex-row items-center justify-center space-x-2">
                <MaterialIcons name="shower" size={24} />
                <Text>
                  {rentalListingDetails.bathrooms} bathroom
                  {rentalListingDetails.bathrooms === 1 ? '' : 's'}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-center space-x-2">
                <MaterialCommunityIcons name="bed" size={24} />
                <Text>
                  {rentalListingDetails.bedrooms} bedroom
                  {rentalListingDetails.bedrooms === 1 ? '' : 's'}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-center space-x-2">
                <MaterialIcons name="group-add" size={24} />
                <Text>
                  {rentalListingDetails.availableRooms} available room
                  {rentalListingDetails.availableRooms === 1 ? '' : 's'}
                </Text>
              </View>
            </View>

            <View className="mt-6 flex flex-row items-center flex-wrap">
              <Text className="text-2xl font-semibold me-5">{rentalListingDetails.title}</Text>
              <Badge variant="outline" className="px-3 py-2">
                <Text className="text-base">{typeLabels[rentalListingDetails.type]}</Text>
              </Badge>
            </View>
            <Text className="text-lg sm:text-justify w-full">{rentalListingDetails.description}</Text>

            <Text className="text-xl font-semibold mt-6">Address</Text>
            <Text className="text-lg font-medium text-neutral-700">
              {rentalListingDetails.streetNumber} {rentalListingDetails.street}, {rentalListingDetails.city},&nbsp;
              {rentalListingDetails.state}, {rentalListingDetails.country}
            </Text>
            <Text className="text-base font-medium text-neutral-600">
              Postal code: {rentalListingDetails.postalCode}
            </Text>
            <Text className="text-base font-medium text-neutral-600">
              Door: {rentalListingDetails.doorNumber}
            </Text>
            <Text className="text-base font-medium text-neutral-600">
              Floor: {rentalListingDetails.floorNumber}
            </Text>

            <Text className="text-xl font-semibold mt-6">Amenities</Text>
            <View className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 mt-5">
              {rentalListingDetails.amenities.map((amenity) => (
                <Amenity key={amenity.id} amenity={amenity} />
              ))}
            </View>

            <View className="flex flex-row space-x-2 mt-10 items-start">
              <Text className="text-xl font-semibold">Size:</Text>
              <Text className="text-lg">
                {rentalListingDetails.size} {sizeUnitLabels[rentalListingDetails.sizeUnit]}
              </Text>
            </View>

            <View className="flex flex-row space-x-2 mt-6 items-start">
              <Text className="text-xl font-semibold">Year built:</Text>
              <Text className="text-lg">{rentalListingDetails.yearBuilt}</Text>
            </View>

            <Text className="text-xl font-semibold mt-6">Rules</Text>
            <Text className="text-lg sm:text-justify w-full">{rentalListingDetails.rules}</Text>

            <Text className="text-xl font-semibold mt-6">Additional Information</Text>
            <Text className="text-lg sm:text-justify w-full">{rentalListingDetails.additionalInformation}</Text>

          </View>
        </>
      )}
    </ScrollView>
  )
}
