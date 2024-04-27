import { View } from 'react-native'
import { Text } from '@/components/Text'
import { Link } from 'expo-router'
import { Button } from '@/components/Button'

export default function MyRentalListingsScreen() {
  return (
    <View>
      <Text>My Rental Listings</Text>
      <Text>
        You have not created any rental listings yet, create one&nbsp;
        <Link href="/create-rental-listing/first-step">
          <Button className="p-0 m-0 inline" variant="link">here</Button>
        </Link>
      </Text>
    </View>
  )
}
