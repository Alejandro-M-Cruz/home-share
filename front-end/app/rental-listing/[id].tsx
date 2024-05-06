import { useGetRentalListingDetails } from '@/hooks/rental-listings/useGetRentalListingDetails'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/Text'
import { Carousel } from '@/components/Carousel'
import { Button } from '@/components/Button'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

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
    <View className="flex-1 flex flex-col">
      {rentalListingDetails && (
        <>
          <View>
            {rentalListingDetails.imageUrls.length === 0 ? (
              <View className="w-full h-[240px] bg-neutral-100 flex items-center justify-center">
                <MaterialCommunityIcons name="image-broken-variant" size={64} />
              </View>
            ) : (
              <Carousel imageUrls={rentalListingDetails.imageUrls} />
            )}
          </View>
          <Text>{rentalListingDetails?.id}</Text>
          <Text>{error?.message}</Text>
          <Text>{status}</Text>
        </>
      )}
    </View>
  )
}
