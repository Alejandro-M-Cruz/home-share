import { useGetRentalListingDetails } from '@/hooks/rental-listings/useGetRentalListingDetails'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/Text'
import { Carousel } from '@/components/Carousel'
import { Button } from '@/components/Button'

export default function RentalListingDetailsScreen() {
    const local = useLocalSearchParams();
    const {
        data, error, status
    } = useGetRentalListingDetails(parseInt(local.id as string, 10))
    if (data == undefined){
        console.log("Yes")
        
    } else {
        console.log(data)
        console.log(data.id)
    }
    return(
    <View className="flex-1 flex flex-col">
        <Text>{data?.id}</Text>
        <Text>{error?.message}</Text>
        <Text>{status}</Text>
    </View>
    )
}