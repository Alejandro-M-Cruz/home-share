import { ScrollView, View } from 'react-native'
import { useRentalListingStore } from '@/hooks/useRentalListingStore'
import { useForm } from 'react-hook-form'
import { CreateRentalListingRequest } from '@/types/rental-listing'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { useRouter } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'

const firstStepSchema: z.ZodType<Partial<CreateRentalListingRequest>> = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  type: z.enum(['apartment', 'house', 'apartment_block']),
  monthlyRent: z.number().min(0),
  availableRooms: z.number().int().min(1),
  size: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  bedrooms: z.number().int().min(0),
  yearBuilt: z.number().int(),
  amenities: z.array(z.string())
})

export default function CreateRentalListingFirstStepScreen() {
  const { rentalListing, update } = useRentalListingStore()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Partial<CreateRentalListingRequest>>({
    resolver: zodResolver(firstStepSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'apartment',
      monthlyRent: undefined,
      availableRooms: 1,
      size: undefined,
      bathrooms: 1,
      bedrooms: undefined,
      yearBuilt: undefined,
      amenities: [],
      ...rentalListing
    }
  })

  const onSubmit = (data: Partial<CreateRentalListingRequest>) => {
    update(data)
    router.replace('/create-rental-listing/second-step')
  }

  return (
    <ScrollView>


      <Button variant="outline" onPress={handleSubmit(onSubmit)}>
        <Text>Next</Text>
      </Button>
    </ScrollView>
  )
}
