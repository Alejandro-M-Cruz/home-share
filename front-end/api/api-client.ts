import axios from 'axios'
import {
  camelizeErrorResponseData,
  camelizeResponseData,
  decamelizeRequestData
} from '@/api/middleware'

const apiJsonClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  withXSRFToken: true
})

apiJsonClient.interceptors.request.use(decamelizeRequestData)

apiJsonClient.interceptors.response.use(
  camelizeResponseData,
  camelizeErrorResponseData
)

const apiFormDataClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true,
  withXSRFToken: true
})

apiFormDataClient.interceptors.response.use(
  camelizeResponseData,
  camelizeErrorResponseData
)

export {
  apiJsonClient,
  apiFormDataClient
}
