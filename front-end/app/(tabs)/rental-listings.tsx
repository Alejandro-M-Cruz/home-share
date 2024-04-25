import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@/components/Text'
import { useRentalListings } from '@/hooks/useRentalListings'
import { RentalListing } from '@/components/RentalListing'
import React, { Fragment, useState } from 'react'
import { Button } from '@/components/Button'
import { RentalListingParamDialog } from '@/components/RentalListingParamDialog'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Input } from '@/components/Input'

export default function RentalListingsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    setParams
  } = useRentalListings()

  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [searchText, setSearchText] = useState<string | null>(null)

  const handleSearchButtonClick = () => {
    setParams({
      filters: {
        country: country || undefined,
        city: city || undefined
      }
    })
    const countrySearchText = country ? `country '${country}'` : ''
    const citySearchText = city ? `city '${city}'` : ''
    setSearchText(
      country || city ?
        `Searched by ${countrySearchText}${country && city ? ' and ' : ''}${citySearchText}` :
        null
    )
  }

  return (
    <ScrollView>
      <Text className="m-3 font-bold text-xl">Rental listings</Text>

      <View className="flex flex-col sm:flex-row gap-2 mx-2 sm:mx-5">
        <Input
          className="rounded-full"
          nativeID="country"
          inputMode="text"
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <Input
          className="rounded-full"
          nativeID="city"
          inputMode="text"
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <View className="flex flex-row gap-3 items-center justify-between max-sm:flex-row-reverse">
          <Button onPress={handleSearchButtonClick} variant="outline" className="rounded-full">
            <Ionicons name="search" size={16} />
          </Button>
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
        </View>
      </View>

      {searchText && (
        <Text className="mx-5 mt-2">{searchText}</Text>
      )}

      <View className="grid grid-cols-12 gap-1 sm:gap-5 mx-2 sm:mx-5 my-4">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map(rentalListing => (
              <RentalListing
                key={rentalListing.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3"
                rentalListing={rentalListing}
              />
            ))}
          </Fragment>
        ))}
      </View>

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

