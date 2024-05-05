import { ScrollView, View } from 'react-native'
import { Text } from '@/components/Text'
import { useRentalListings } from '@/hooks/rental-listings/useRentalListings'
import { RentalListing } from '@/components/RentalListing'
import { Fragment, useState } from 'react'
import { Button } from '@/components/Button'
import { RentalListingParamDialog } from '@/components/RentalListingParamDialog'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Input } from '@/components/Input'
import { cn } from '@/helpers/cn'

export default function RentalListingsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    params,
    setParams
  } = useRentalListings()

  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [searchText, setSearchText] = useState<string | null>(null)

  const handleSearchButtonClick = () => {
    setParams({
      ...params,
      filters: {
        ...params.filters,
        country: country || undefined,
        city: city || undefined
      }
    })
    const countrySearchText = country ? `country '${country}'` : ''
    const citySearchText = city ? `city '${city}'` : ''
    setSearchText(
      country || city
        ? `Searched by ${countrySearchText}${country && city ? ' and ' : ''}${citySearchText}`
        : null
    )
  }

  const handleClearSearchButtonClick = () => {
    setCountry('')
    setCity('')
    setSearchText(null)
    setParams({
      ...params,
      filters: {
        ...params.filters,
        country: undefined,
        city: undefined
      }
    })
  }

  return (
    <View className="sm:py-4 py-2 flex-1">
      <View className="flex flex-col sm:flex-row gap-2 mx-2 sm:mx-5 pb-2">
        <Input
          className="rounded-full"
          id="country"
          inputMode="text"
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <Input
          className="rounded-full"
          id="city"
          inputMode="text"
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <View className="flex flex-row gap-3 items-center justify-between max-sm:flex-row-reverse">
          <Button
            onPress={handleSearchButtonClick}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
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
        <View className="flex flex-row items-center justify-start">
          <Button
            onPress={handleClearSearchButtonClick}
            variant="outline"
            size="sm"
            className="flex flex-row items-center gap-3 mx-5 mt-2 rounded-full"
          >
            <AntDesign name="close" size={16} />
            <Text className="text-sm">{searchText}</Text>
          </Button>
        </View>
      )}

      <ScrollView className="flex-1">
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

        {isFetching && (
          <AntDesign
            className={cn(
              'my-[160px] mx-auto animate-spin',
              isFetchingNextPage && 'my-5'
            )}
            name="loading1"
            size={24}
          />
        )}

        <Button
          onPress={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
          className="mx-auto my-3"
          variant="outline"
        >
          <Text>Load more...</Text>
        </Button>
      </ScrollView>
    </View>
  )
}
