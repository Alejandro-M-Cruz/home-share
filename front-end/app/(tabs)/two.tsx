import { Button, Platform, ScrollView, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useAmenities } from '@/hooks/useAmenities'
import { Amenity } from '@/components/Amenity'
import { useRentalListings } from '@/hooks/useRentalListings'
import { RentalListing } from '@/components/RentalListing'
import { Fragment, useState } from 'react'
import { GetRentalListingsParams, RentalListingSortBy } from '@/types/rental-listing'

export default function TabTwoScreen() {
  const { amenities, error, status } = useAmenities()
  const { data, fetchNextPage, fetchPreviousPage, hasNextPage, isFetching, refetch, params, setParams } =
    useRentalListings()
  const [filters, setFilters] = useState<GetRentalListingsParams['filters']>({})

  const changeParam = (newParams: GetRentalListingsParams) => {
    setParams({ ...params, ...newParams })
  }

  const changeFilter = (newFilters: GetRentalListingsParams['filters']) => {
    setFilters({ ...params.filters, ...newFilters })
  }

  const resetParams = () => {
    setParams({})
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
        <>
          <select
            style={{ margin: 30 }}
            onChange={e => changeParam({ sortBy: e.target.value as RentalListingSortBy })}
          >
            <option value="created_at">Created At</option>
            <option value="updated_at">Updated At</option>
            <option value="monthly_rent">Monthly Rent</option>
            <option value="available_rooms">Available Rooms</option>
            <option value="size">Size</option>
            <option value="year_built">Year Built</option>
          </select>
          <select
            style={{ marginInline: 30, marginBottom: 10 }}
            onChange={e => changeParam({ sortDirection: e.target.value as 'asc' | 'desc' })}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <p style={{ textAlign: 'center' }}>Monthly rent</p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center' }}>
            <input
              type="number"
              placeholder="Min"
              onChange={e => changeFilter({ minMonthlyRent: e.target.value ? parseFloat(e.target.value) : undefined})}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              onChange={e => changeFilter({ maxMonthlyRent: e.target.value ? parseFloat(e.target.value) : undefined })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center' }}>
            <input type="text" placeholder="Country" onChange={e => changeFilter({ country: e.target.value })} />
            <input type="text" placeholder="City" onChange={e => changeFilter({ city: e.target.value })} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center' }}>
            <button onClick={resetParams}>
              Reset
            </button>
            <button
              onClick={() => changeParam({ filters })}
            >
              Apply
            </button>
          </div>
        </>
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
