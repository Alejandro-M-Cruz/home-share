import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@/components/Text'
import { useRentalListings } from '@/hooks/useRentalListings'
import { RentalListing } from '@/components/RentalListing'
import React, { Fragment } from 'react'
import { Button } from '@/components/Button'
import { RentalListingParamDialog } from '@/components/RentalListingParamDialog'
import { AntDesign } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function RentalListingsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    setParams
  } = useRentalListings()

  return (
    <ScrollView>
      <Text style={styles.title}>Rental listings</Text>

      <RentalListingParamDialog
        initialParams={{ sortBy: 'created_at', sortDirection: 'desc' }}
        onSubmit={setParams}
        onReset={() => setParams({})}
        closeOnReset
      >
        <Button
          variant="outline"
          className="w-40 mx-auto flex flex-row items-center"
        >
          <FontAwesome name="sort" size={16} className="me-2" />
          <AntDesign name="filter" size={16} className="me-2" />
          <Text>Sort and filter</Text>
        </Button>
      </RentalListingParamDialog>

      <View style={styles.separator} />
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
        onPress={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        <Text>Load more</Text>
      </Button>
      <Button onPress={() => refetch()}>
        <Text>Refetch</Text>
      </Button>
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
