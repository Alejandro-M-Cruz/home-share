import { ScrollView, View } from 'react-native'
import { Text } from '@/components/Text'
import { Link, Redirect } from 'expo-router'
import { Button } from '@/components/Button'
import { useMyRentalListings } from '@/hooks/rental-listings/useMyRentalListings'
import { Fragment, useMemo, useState } from 'react'
import { RentalListing } from '@/components/RentalListing'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { cn } from '@/helpers/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/Select'
import { RentalListingSortBy } from '@/types/rental-listing'
import {
  sortByLabels,
  sortDirectionLabels,
  statusLabels
} from '@/constants/labels'
import { Label } from '@/components/Label'
import { useAuth } from '@/hooks/useAuth'

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

  const isEmpty = useMemo(
    () => !data?.pages.length || !data.pages[0].data.length,
    [data]
  )

  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const handleStatusFilterChange = (value: 'all' | 'active' | 'inactive') => {
    setStatus(value)
    setParams({
      ...params,
      filters: { status: value === 'all' ? undefined : value }
    })
  }

  const [sortBy, setSortBy] = useState<RentalListingSortBy>('created_at')
  const handleSortByChange = (value: RentalListingSortBy) => {
    setSortBy(value)
    setParams({ ...params, sortBy: value, sortDirection: params.sortDirection ?? 'desc' })
  }

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const handleSortDirectionChange = (value: 'asc' | 'desc') => {
    setSortDirection(value)
    setParams({ ...params, sortDirection: value })
  }

  const { user, userStatus } = useAuth()

  if ((!user && userStatus === 'success') || userStatus === 'error') {
    return <Redirect href="/login" />
  }

  return (
    <View className="flex-1 flex flex-col">
      <View className="flex flex-col max-sm:space-y-3 items-center sm:flex-row sm:justify-end sm:space-x-4 md:space-x-10 px-2 sm:px-3 md:px-5 pt-4 pb-5">
        <View className="flex flex-row items-center space-x-1 md:space-x-2">
          <Label nativeID="status">Filter by status</Label>
          <Select
            value={{ label: statusLabels[status], value: status }}
            onValueChange={option =>
              handleStatusFilterChange(
                (option?.value || 'all') as 'all' | 'active' | 'inactive'
              )
            }
          >
            <SelectTrigger>
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Filter"
              />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusLabels).map(([key, label]) => (
                <SelectItem key={key} value={key} label={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>

        <View className="flex flex-row items-center space-x-1 md:space-x-2">
          <Label nativeID="sortBy">Sort by</Label>

          <Select
            value={{ label: sortByLabels[sortBy], value: sortBy }}
            onValueChange={option =>
              handleSortByChange(
                (option?.value || 'created_at') as RentalListingSortBy
              )
            }
          >
            <SelectTrigger>
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Sort by"
              />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sortByLabels).map(([key, label]) => (
                <SelectItem key={key} value={key} label={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={{
              label: sortDirectionLabels[sortDirection],
              value: sortDirection
            }}
            onValueChange={option =>
              handleSortDirectionChange(
                (option?.value || 'desc') as 'asc' | 'desc'
              )
            }
          >
            <SelectTrigger>
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Sort direction"
              />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sortDirectionLabels).map(([key, label]) => (
                <SelectItem key={key} value={key} label={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>

        <Link href="/create-rental-listing/first-step" asChild>
          <Button className="max-sm:hidden flex flex-row items-center space-x-2">
            <MaterialCommunityIcons
              name="home-plus"
              className="text-primary-foreground"
              size={24}
            />
            <Text>Create new</Text>
          </Button>
        </Link>
      </View>

      {userStatus === 'success' && !isFetching && isEmpty ? (
        <View className="flex-grow flex flex-col items-center justify-center space-y-5 mx-5">
          <Text className="text-lg text-neutral-600 text-center font-medium text-wrap">
            You don't have any rental listings yet.
          </Text>
          <Link href="/create-rental-listing/first-step" asChild>
            <Button
              variant="outline"
              className="flex flex-row items-center space-x-3"
            >
              <MaterialCommunityIcons name="home-plus" size={24} />
              <Text>Create one here</Text>
            </Button>
          </Link>
        </View>
      ) : (
        <ScrollView className="flex-1 flex flex-col px-2 sm:px-5 pb-4">
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
      )}

      <Link href="/create-rental-listing/first-step" asChild>
        <Button
          size="icon"
          className="sm:hidden absolute right-5 bottom-5 rounded-full"
        >
          <MaterialCommunityIcons
            name="home-plus"
            className="text-primary-foreground"
            size={24}
          />
        </Button>
      </Link>
    </View>
  )
}
