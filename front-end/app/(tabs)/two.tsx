import { Button, ScrollView, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useAmenities } from '@/hooks/useAmenities'
import { Amenity } from '@/components/Amenity'
import { useRentalListings } from '@/hooks/useRentalListings'
import { RentalListing } from '@/components/RentalListing'
import { Fragment } from 'react'

export default function TabTwoScreen() {
  const { amenities, error, status } = useAmenities()
  const { data, fetchNextPage, hasNextPage, isFetching } = useRentalListings()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      {status === 'pending' ? (
        <Text>Loading...</Text>
      ) : status === 'error' ? (
        <Text>Error: {error?.message}</Text>
      ) : (
        amenities?.map(amenity => (
          <Amenity key={amenity.id} amenity={amenity} />
        ))
      )}
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map(rentalListing => (
            <RentalListing
              key={rentalListing.id}
              rentalListing={rentalListing}
            />
          ))}
        </Fragment>
      ))}
      <Button
        title="Load More"
        onPress={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      />
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
