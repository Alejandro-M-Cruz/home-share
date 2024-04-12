import { RentalListing as RentalListingType } from '@/types/rental-listing'
import { Image, Text, View } from 'react-native'

type RentalListingProps = {
  rentalListing: RentalListingType
}

export const RentalListing = ({ rentalListing }: RentalListingProps) => (
  <View>
    {rentalListing.imageUrls && (
      <Image
        source={{ uri: rentalListing.imageUrls[0] }}
        style={{ width: 400, height: 200 }}
      />
    )}
    <Text>{rentalListing.title}</Text>
    <Text>{rentalListing.type}</Text>
    <Text>{rentalListing.monthlyRent}</Text>
    <Text>{rentalListing.size}</Text>
    <Text>{rentalListing.sizeUnit}</Text>
    <Text>{rentalListing.country}</Text>
    <Text>{rentalListing.state}</Text>
    <Text>{rentalListing.city}</Text>
    <Text>{rentalListing.street}</Text>
    <Text>{rentalListing.availableRooms}</Text>
    <Text>{rentalListing.createdAt}</Text>
    <Text>{rentalListing.updatedAt}</Text>
  </View>
)
