import { StyleSheet, Text, View } from 'react-native'
import { AddressAutocomplete } from '@/components/AddressAutocomplete'

export default function CreateRentalListingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Rental Listing</Text>
      <AddressAutocomplete />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

