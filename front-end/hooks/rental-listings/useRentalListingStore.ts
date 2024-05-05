import { CreateRentalListingRequest } from '@/types/rental-listing'
import { create } from 'zustand'

type RentalListingState = {
  rentalListing: Partial<CreateRentalListingRequest>
  patchRentalListing: (data: Partial<CreateRentalListingRequest>) => void
  id?: number
  setId: (id: number) => void

}

export const useRentalListingStore = create<RentalListingState>()(
  (set, get) => ({
    rentalListing: {},
    setId: (id: number) => {
      set({ id })
    },
    patchRentalListing: (data: Partial<CreateRentalListingRequest>) => {
      set(state => ({ rentalListing: { ...state.rentalListing, ...data } }))
    }
  })
)
