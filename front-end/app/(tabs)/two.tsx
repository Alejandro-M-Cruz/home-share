import { Button, Platform, ScrollView, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useAmenities } from '@/hooks/useAmenities'
import { Amenity } from '@/components/Amenity'
import { useRentalListings } from '@/hooks/useRentalListings'
import { RentalListing } from '@/components/RentalListing'
import { Fragment } from 'react'
import { GetRentalListingsParams, RentalListingSortBy } from '@/types/rental-listing'

export default function TabTwoScreen() {
  const { amenities, error, status } = useAmenities()
  const { data, fetchNextPage, fetchPreviousPage, hasNextPage, isFetching, refetch, params, setParams } =
    useRentalListings()

  const handleParamChange = async (newParams: GetRentalListingsParams) => {
    setParams({ ...params, ...newParams })
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      {Platform.OS === 'web' && (
        <select
          style={{ margin: 30 }}
          onChange={e => handleParamChange({ sortBy: e.target.value as RentalListingSortBy })}
        >
          <option value="created_at">Created At</option>
          <option value="updated_at">Updated At</option>
          <option value="monthly_rent">Monthly Rent</option>
          <option value="available_rooms">Available Rooms</option>
          <option value="size">Size</option>
          <option value="year_built">Year Built</option>
        </select>
      )}
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
      <Button title="Refetch" onPress={() => refetch()} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
