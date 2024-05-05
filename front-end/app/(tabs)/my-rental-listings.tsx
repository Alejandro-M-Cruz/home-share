import { ScrollView, View } from 'react-native'
import { Text } from '@/components/Text'
import { Link } from 'expo-router'
import { Button } from '@/components/Button'
import { useMyRentalListings } from '@/hooks/useMyRentalListings'
import { Fragment, useMemo } from 'react'
import { RentalListing } from '@/components/RentalListing'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { cn } from '@/helpers/cn'

export default function MyRentalListingsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    params,
    setParams
  } = useMyRentalListings()

  const isEmpty = useMemo(() => !data?.pages.length || !data.pages[0].data.length, [data])

  return (
    <View className="flex-1">

      <View className="flex flex-row items-center justify-between px-2 sm:px-5 py-4">

        <Link href="/create-rental-listing/first-step" asChild>
          <Button className="flex flex-row items-center space-x-2">
            <MaterialCommunityIcons name="home-plus" className="text-primary-foreground" size={24} />
            <Text>Create new</Text>
          </Button>
        </Link>
      </View>

      <ScrollView className="flex-1 px-2 sm:px-5 pb-4">
        {!isEmpty && (
          <View className="grid grid-cols-12 gap-1 sm:gap-5">
            {data?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.data.map(rentalListing => (
                  <RentalListing
                    key={rentalListing.id}
                    className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3"
                    variant="my_rental_listing"
                    rentalListing={rentalListing}
                  />
                ))}
              </Fragment>
            ))}
          </View>
        )}

        {!isFetching && isEmpty && (
          <View className="flex flex-col items-center justify-center space-y-5">
            <Text>
              You have not created any rental listings yet.
            </Text>
            <Link href="/create-rental-listing/first-step" asChild>
              <Button className="p-0 m-0 inline">
                <Text>Create one here</Text>
              </Button>
            </Link>
          </View>
        )}

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

        {!isEmpty && (
          <Button
            onPress={() => fetchNextPage()}
            disabled={!hasNextPage || isFetching}
            className="mx-auto my-3"
            variant="outline"
          >
            <Text>Load more...</Text>
          </Button>
        )}
      </ScrollView>
    </View>
  )
}
