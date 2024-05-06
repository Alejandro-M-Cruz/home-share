import { Text, View } from 'react-native'
import { Map } from '@/components/Map'
import { useLocations } from '@/hooks/useLocations'
import { useState } from 'react'
import { useGetRentalListingByLocationId } from '@/hooks/rental-listings/useGetRentalListingByLocationId'
import { MapLocation } from '@/components/Map/types'
import { RentalListing } from '@/components/RentalListing'

export default function RentalListingMap() {
  const { locations, error, status } = useLocations()
  const [locationId, setLocationId] = useState<number | undefined>()
  const {
    rentalListing,
    status: rentalListingStatus
  } = useGetRentalListingByLocationId(locationId)

  const handleLocationChange = (location: MapLocation | undefined) => {
    setLocationId(location?.id)
  }

  return (
    <View className="flex-1 relative">
      {status === 'success' && locations ? (
        <>
          <Map locations={locations} onLocationChange={handleLocationChange} />
          {rentalListingStatus === 'success' && rentalListing && (
            <RentalListing className="absolute bottom-0 left-0 m-2" rentalListing={rentalListing} />
          )}
        </>
      ) : (
        <Text>{error?.message ?? 'Loading...'}</Text>
      )}
    </View>
  )
}
