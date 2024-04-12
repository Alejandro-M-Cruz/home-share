export type RentalListing = {
  id: number
  title: string
  type: 'house' | 'apartment' | 'apartment_block'
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
