import { camelizeKeys, decamelizeKeys } from 'humps'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const decamelizeRequestData = (request: InternalAxiosRequestConfig) => {
  if (request.data) {
    request.data = decamelizeKeys(request.data)
  }
  return request
}

const camelizeResponseData = (response: AxiosResponse) => {
  if (
    response.data &&
    response.headers['content-type']?.toString().includes('application/json')
  ) {
    response.data = camelizeKeys(response.data)
  }
  return response
}

const camelizeErrorResponseData = (error: any) => {
  if (
    error.response?.data &&
    error.response.headers?.['content-type']?.toString().includes('application/json')
  ) {
    error.response.data = camelizeKeys(error.response.data)
  }
  return Promise.reject(error)
}

export {
  decamelizeRequestData,
  camelizeResponseData,
  camelizeErrorResponseData
}
