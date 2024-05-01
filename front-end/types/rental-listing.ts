import { ImagePickerAsset } from 'expo-image-picker'

type RentalListingType = 'house' | 'apartment' | 'apartment_block'

type RentalListingPage = {
  data: RentalListing[]
  links: {
    first: string | null
    last: string | null
    next: string | null
    prev: string | null
  }
  meta: {
    path: string
    perPage: number
    nextCursor: string | null
    prevCursor: string | null
  }
}

type RentalListing = {
  id: number
  title: string
  type: RentalListingType
  monthlyRent: number
  size: number
  sizeUnit: 'sq_ft' | 'sq_m'
  bathrooms: number
  bedrooms: number
  yearBuilt: number
  availableRooms: number
  country: string
  state: string
  city: string
  street: string
  streetNumber: string
  createdAt: string
  updatedAt: string
  username: string
  userCreatedAt: string
  imageUrls: string[]
}

type GetRentalListingsParams = Partial<{
  cursor: string
  perPage: number
  sortBy: RentalListingSortBy
  sortDirection: 'asc' | 'desc'
  filters: RentalListingFilters
}>

type RentalListingSortBy =
  | 'created_at'
  | 'updated_at'
  | 'monthly_rent'
  | 'available_rooms'
  | 'size'
  | 'year_built'

type RentalListingFilters = Partial<{
  type: RentalListingType
  city: string
  country: string
  minMonthlyRent: number
  maxMonthlyRent: number
  minAvailableRooms: number
  maxAvailableRooms: number
}>

type CreateRentalListingLocation = {
  country: string
  state: string
  city: string
  street: string
  streetNumber: string
  doorNumber?: string
  floorNumber?: number
  postalCode: string
  latitude: number
  longitude: number
}

type CreateRentalListingRequest = {
  title: string
  type: RentalListingType
  description: string
  monthlyRent: number
  availableRooms: number
  size: number
  bathrooms: number
  bedrooms: number
  yearBuilt: number
  location: CreateRentalListingLocation
  amenities: string[]
  images: ImagePickerAsset[]
}

export {
  RentalListingType,
  RentalListingPage,
  RentalListing,
  GetRentalListingsParams,
  RentalListingSortBy,
  RentalListingFilters,
  CreateRentalListingRequest,
  CreateRentalListingLocation
}
