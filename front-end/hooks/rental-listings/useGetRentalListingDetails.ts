import { getRentalListingDetails } from '@/services/rental-listing'
import * as tokenStorage from '@/services/token-storage'
import * as React from 'react'
import { useQuery } from '@tanstack/react-query'

export function useGetRentalListingDetails(id: number){
    const { data, error, status } = useQuery({
        queryKey: [`rental-listing-${id}`],
        queryFn: async () => {
            const token = await tokenStorage.getToken()
            return getRentalListingDetails(id, token)
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })

    return {
        data,
        error,
        status
    }
}