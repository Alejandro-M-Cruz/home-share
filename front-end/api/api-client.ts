import axios from 'axios'
import { camelizeErrorResponse, camelizeResponse, decamelizeRequest } from '@/api/middleware'

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  withXSRFToken: true
})

apiClient.interceptors.request.use(decamelizeRequest)

apiClient.interceptors.response.use(camelizeResponse, camelizeErrorResponse)
