import { CreateRentalListingRequest } from '@/types/rental-listing'
import { create } from 'zustand'

type RentalListingState = {
  rentalListing: Partial<CreateRentalListingRequest>
  update: (data: Partial<CreateRentalListingRequest>) => void
}

export const useRentalListingStore = create<RentalListingState>()(
  (set, get) => ({
    rentalListing: {},
    update: (data: Partial<CreateRentalListingRequest>) => {
      set(state => ({ rentalListing: { ...state.rentalListing, ...data } }))
    }
  })
)
