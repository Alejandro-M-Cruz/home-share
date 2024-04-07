import { QueryClient } from '@tanstack/react-query'

const QUERY_CACHE_EXPIRATION_MS = 1000 * 60 * 2

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CACHE_EXPIRATION_MS
    }
  }
})
