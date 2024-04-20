import { ScrollView, StyleSheet, View } from 'react-native'

import { Text } from '@/components/Text'
import { useAmenities } from '@/hooks/useAmenities'
import { Amenity } from '@/components/Amenity'
import { useRentalListings } from '@/hooks/useRentalListings'

export default function TabTwoScreen() {
  const { amenities, error, status } = useAmenities()
  const { data, fetchNextPage, hasNextPage, isFetching } = useRentalListings()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {status === 'pending' ? (
          <Text>Loading...</Text>
        ) : status === 'error' ? (
          <Text>Error: {error?.message}</Text>
        ) : (
          <View style={{ flex: 1, flexDirection: 'column', gap: 2 }}>
            {amenities?.map(amenity => (
              <Amenity key={amenity.id} amenity={amenity} />
            ))}
          </View>
        )}
      </View>
      {/*{data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map(rentalListing => (
            <RentalListing
              key={rentalListing.id}
              rentalListing={rentalListing}
            />
          ))}
        </Fragment>
      ))}
      <Button.tsx
        title="Load More"
        onPress={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      />*/}
    </ScrollView>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
