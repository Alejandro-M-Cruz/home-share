import axios, { AxiosResponse } from 'axios'

export const apiClient = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_ENV === 'production'
      ? process.env.EXPO_PUBLIC_API_BASE_URL_PRODUCTION
      : process.env.EXPO_PUBLIC_API_BASE_URL_LOCAL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  withXSRFToken: true
})

const logResponse = (response: AxiosResponse) => {
  console.log('Response:', response)
  return response
}

apiClient.interceptors.response.use(logResponse, logResponse)
