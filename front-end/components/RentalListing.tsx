import { RentalListing as RentalListingType } from '@/types/rental-listing'
import { Text, View } from 'react-native'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/Card'
import * as React from 'react'
import { ViewRef } from '@/primitives/types'
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import { Badge } from '@/components/Badge'
import { Carousel } from '@/components/Carousel'
import { statusLabels, typeLabels } from '@/constants/labels'
import { cn } from '@/helpers/cn'
import { Separator } from '@/components/Separator'
import { Button } from '@/components/Button'
import { useDeleteRentalListing } from '@/hooks/rental-listings/useDeleteRentalListing'
import { useToggleRentalListingStatus } from '@/hooks/rental-listings/useToggleRentalListingStatus'
import { Link } from 'expo-router'

type RentalListingProps = {
  rentalListing: RentalListingType
  variant?: 'default' | 'my_rental_listing'
}

const RentalListing = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & RentalListingProps
>(({ rentalListing, variant = 'default', ...props }, ref) => {
  const { toggleStatus } = useToggleRentalListingStatus()
  const { deleteRentalListing } = useDeleteRentalListing()

  const handleStatusToggle = () => {
    toggleStatus(rentalListing)
  }

  const handleDelete = () => {
    deleteRentalListing(rentalListing)
  }

  return (
    <Card ref={ref} {...props}>
      <Link
        href={{
          pathname: '/rental-listing/[id]',
          params: { id: rentalListing.id }
        }}
        asChild
      >
        <CardHeader className="gap-y-1 py-3 px-5 group">
          <View className="flex flex-row items-center justify-end gap-2">
            <CardTitle className="flex-1 text-xl max-sm:hidden truncate web:group-hover:underline group-active:underline underline-offset-4">
              {variant === 'default'
                ? rentalListing.username
                : rentalListing.title}
            </CardTitle>

            <Badge variant="outline" className="me-2 max-sm:flex-1">
              <Text>{typeLabels[rentalListing.type]}</Text>
            </Badge>
            <MaterialIcons name="group-add" size={24} />
            <Text className="font-semibold text-lg">
              {rentalListing.availableRooms}
            </Text>
          </View>
          <CardTitle className="flex-1 text-xl sm:hidden">
            {variant === 'default'
              ? rentalListing.username
              : rentalListing.title}
          </CardTitle>
          {variant === 'default' ? (
            <Text className="text-neutral-500">
              Member since {new Date(rentalListing.userCreatedAt).toLocaleDateString()}
            </Text>
          ) : (
            <Text className="text-neutral-500">
              Created on {new Date(rentalListing.createdAt).toLocaleDateString()}
            </Text>
          )}
        </CardHeader>
      </Link>

      <CardContent className="p-0 relative group">
        {rentalListing.imageUrls.length > 0 ? (
          <Carousel
            imageUrls={rentalListing.imageUrls}
            imageClassName="w-full h-[240px]"
          />
        ) : (
          <View className="w-full h-[240px] bg-neutral-100 flex items-center justify-center">
            <MaterialCommunityIcons name="image-broken-variant" size={64} />
          </View>
        )}
      </CardContent>

      <CardFooter className="flex-grow flex flex-col py-3 mx-0 px-0">
        <Link
          href={{
            pathname: '/rental-listing/[id]',
            params: { id: rentalListing.id }
          }}
          asChild
        >
          <View className="flex-grow grid grid-cols-6 sm:grid-cols-12 gap-y-3 gap-x-3 max-sm:mx-2 px-5">
            <Text className="font-light max-sm:text-center text-base text-neutral-600 col-span-12 sm:col-span-6">
              {rentalListing.street}, {rentalListing.streetNumber}
            </Text>

            <Text className="font-medium text-center sm:text-end text-neutral-500 col-span-12 sm:col-span-6">
              {rentalListing.city}, {rentalListing.state},{' '}
              {rentalListing.country}
            </Text>

            <View className="flex flex-row items-center justify-center gap-2 col-span-12 sm:col-span-6 xl:col-span-4">
              <MaterialIcons name="shower" size={24} />
              <Text>
                {rentalListing.bathrooms} bathroom
                {rentalListing.bathrooms === 1 ? '' : 's'}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-2 col-span-12 sm:col-span-6 xl:col-span-4">
              <MaterialCommunityIcons name="bed" size={24} />
              <Text>
                {rentalListing.bedrooms} bedroom
                {rentalListing.bedrooms === 1 ? '' : 's'}
              </Text>
            </View>

            <View className="col-span-12 xl:col-span-4 flex flex-row flex-wrap items-center justify-center">
              <Text className="font-semibold text-base text-center ">
                ${rentalListing.monthlyRent.toFixed(2)}
              </Text>
              <Text className="font-semibold text-sm text-neutral-500">
                {' '}
                / month
              </Text>
            </View>
          </View>
        </Link>
        {variant === 'my_rental_listing' && (
          <>
            <Separator orientation="horizontal" className="mt-3 mb-2" />
            <View className="flex flex-row justify-between w-full items-center space-x-2 px-3 relative">
              <Badge
                className={cn(
                  rentalListing.status === 'active'
                    ? 'bg-green-500'
                    : 'bg-amber-500'
                )}
              >
                <Text className="text-primary-foreground">
                  {statusLabels[rentalListing.status]}
                </Text>
              </Badge>
              <Button
                onPress={handleStatusToggle}
                size="icon"
                variant="ghost"
                className="rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {rentalListing.status === 'active' ? (
                  <FontAwesome6 name="eye-slash" size={20} />
                ) : (
                  <FontAwesome6 name="eye" size={20} />
                )}
              </Button>
              <Button
                onPress={handleDelete}
                size="icon"
                variant="ghost"
                className="rounded-full web:hover:bg-destructive active:bg-destructive group"
              >
                <MaterialCommunityIcons
                  className="group-active:text-destructive-foreground web:group-hover:text-destructive-foreground"
                  name="delete-forever"
                  size={28}
                />
              </Button>
            </View>
          </>
        )}
      </CardFooter>
    </Card>
  )
})

RentalListing.displayName = 'RentalListing'

export { RentalListing }
