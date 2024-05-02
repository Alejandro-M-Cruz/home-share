import { CreateRentalListingLocation } from '@/types/rental-listing'

export type LocationAutocompleteProps = {
  onLocationChange: (location: Partial<CreateRentalListingLocation>) => void
}
