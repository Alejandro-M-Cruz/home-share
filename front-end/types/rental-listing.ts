export type RentalListingType = 'house' | 'apartment' | 'apartment_block'

export type RentalListingPage = {
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

export type RentalListing = {
  id: number
  title: string
  type: RentalListingType
  monthlyRent: number
  size: number
  sizeUnit: 'sq_ft' | 'sq_m'
  country: string
  state: string
  city: string
  street: string
  availableRooms: number
  createdAt: string
  updatedAt: string
  imageUrls: string[]
}

export type GetRentalListingsParams = Partial<{
  cursor: string
  perPage: number
  sortBy: RentalListingSortBy
  sortDirection: 'asc' | 'desc'
  filters: RentalListingFilters
}>

export type RentalListingSortBy =
  | 'created_at'
  | 'updated_at'
  | 'monthly_rent'
  | 'available_rooms'
  | 'size'
  | 'year_built'

export type RentalListingFilters = Partial<{
  type: RentalListingType
  city: string
  country: string
  minMonthlyRent: number
  maxMonthlyRent: number
  minAvailableRooms: number
  maxAvailableRooms: number
}>
