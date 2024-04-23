import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@/components/Text'
import { useRentalListings } from '@/hooks/useRentalListings'
import { RentalListing } from '@/components/RentalListing'
import React, { Fragment, useState } from 'react'
import {
  GetRentalListingsParams,
  RentalListingSortBy
} from '@/types/rental-listing'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabTwoScreen() {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetching,
    refetch,
    params,
    setParams
  } = useRentalListings()
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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-40 mx-auto flex flex-row items-center">
            <AntDesign name="filter" size={16} className="me-2" />
            <Text>Filters</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-center">Filters and sorting</DialogTitle>
          </DialogHeader>

          <View className="flex flex-col space-y-6 px-4 mt-5">
            <View className="flex flex-row items-center justify-center space-x-4">
              <Text>Sort by</Text>

              <Select
                defaultValue={{ value: 'created_at', label: 'Creation date' }}
                onValueChange={option => changeParam({ sortBy: option?.value as RentalListingSortBy })}
                className="z-50"
              >
                <SelectTrigger>
                  <SelectValue className="text-foreground text-sm native:text-lg" placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem className="z-50" value="created_at" label="Creation date">
                    Created At
                  </SelectItem>
                  <SelectItem value="updated_at" label="Recently updated">
                    Updated At
                  </SelectItem>
                  <SelectItem value="monthly_rent" label="Monthly rent">
                    Monthly Rent
                  </SelectItem>
                  <SelectItem value="available_rooms" label="Available rooms">
                    Available Rooms
                  </SelectItem>
                  <SelectItem value="size" label="Size">
                    Size
                  </SelectItem>
                  <SelectItem value="year_built" label="Year built">
                    Year Built
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                defaultValue={{ value: 'asc', label: 'Ascending' }}
                onValueChange={option => changeParam({ sortDirection: option?.value as 'asc' | 'desc' | undefined })}
              >
                <SelectTrigger>
                  <SelectValue className="text-foreground text-sm native:text-lg" placeholder="Sort direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc" label="Ascending">
                    Ascending
                  </SelectItem>
                  <SelectItem value="desc" label="Descending">
                    Descending
                  </SelectItem>
                </SelectContent>
              </Select>
            </View>

            <View className="flex flex-row items-center justify-center">
              <Text className="w-full text-end me-3">Monthly rent </Text>
              <Text className="pe-0 me-1 text-end">$</Text>
              <Input
                className="ms-0 me-3"
                inputMode="numeric"
                placeholder="0.00"
                onChangeText={text => changeFilter({ minMonthlyRent: text ? parseFloat(text) : undefined })}
              />
              <Text className="me-3 font-extrabold">-</Text>
              <Text className="me-1 text-end">$</Text>
              <Input
                inputMode="numeric"
                onChangeText={text => changeFilter({ maxMonthlyRent: text ? parseFloat(text) : undefined })}
              />
            </View>

            <View className="flex flex-row items-center justify-center space-x-3">
              <Text className="w-full text-end">Available rooms</Text>
              <Input
                inputMode="numeric"
                placeholder="0"
                onChangeText={text => changeFilter({ minAvailableRooms: text ? parseInt(text) : undefined })}
              />
              <Text className="font-extrabold">-</Text>
              <Input
                inputMode="numeric"
                placeholder=""
                onChangeText={text => changeFilter({ maxAvailableRooms: text ? parseInt(text) : undefined })}
              />
            </View>

            <Input
              inputMode="text"
              placeholder="Country"
              onChangeText={text => changeFilter({ country: text })}
            />

            <Input
              inputMode="text"
              placeholder="City"
              onChangeText={text => changeFilter({ city: text })}
            />

            <View className="flex flex-row space-x-4 justify-center">
              <Button onPress={resetParams}><Text>Reset</Text></Button>
              <Button variant="outline" onPress={() => changeParam({ filters })}>
                <Text>Apply</Text>
              </Button>
            </View>
          </View>
        </DialogContent>
      </Dialog>

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
