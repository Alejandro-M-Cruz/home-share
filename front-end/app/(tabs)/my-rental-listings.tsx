import { ScrollView, View } from 'react-native'
import { Text } from '@/components/Text'
import { Link } from 'expo-router'
import { Button } from '@/components/Button'
import { useMyRentalListings } from '@/hooks/useMyRentalListings'
import { Fragment } from 'react'
import { RentalListing } from '@/components/RentalListing'
import { AntDesign } from '@expo/vector-icons'
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

  return (
    <View className="flex-1">
      <Text>My Rental Listings</Text>

      {!data?.pages.length || !data.pages[0].data.length ? (
        <>
          <Text>
            You have not created any rental listings yet, create one&nbsp;
          </Text>
          <Link href="/create-rental-listing/first-step">
            <Button className="p-0 m-0 inline" variant="link">
              <Text>here</Text>
            </Button>
          </Link>
        </>
      ) : (
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
      )}
    </View>
  )
}
