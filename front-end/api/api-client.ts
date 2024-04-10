import axios from 'axios'
import { camelizeErrorResponseData, camelizeResponseData, decamelizeRequestData } from '@/api/middleware'

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  withXSRFToken: true
})

apiClient.interceptors.request.use(decamelizeRequestData)

apiClient.interceptors.response.use(camelizeResponseData, camelizeErrorResponseData)
