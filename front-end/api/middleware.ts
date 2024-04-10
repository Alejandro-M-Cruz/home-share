import { camelizeKeys, decamelizeKeys } from 'humps'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const decamelizeRequest = (request: InternalAxiosRequestConfig) => {
  if (request.data) {
    request.data = decamelizeKeys(request.data)
  }
  return request
}

const camelizeResponse = (response: AxiosResponse) => {
  if (response.data &&
    response.headers['Content-Type']?.toString().includes('application/json')) {
    response.data = camelizeKeys(response.data)
  }
  return response
}

const camelizeErrorResponse = (error: any) => {
  if (error.response?.data) {
    error.response.data = camelizeKeys(error.response.data)
  }
  return Promise.reject(error)
}

export { decamelizeRequest, camelizeResponse, camelizeErrorResponse }
