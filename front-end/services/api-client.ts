import axios from 'axios'

export const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.API_URL_PROD
      : process.env.API_URL_DEV,
})
