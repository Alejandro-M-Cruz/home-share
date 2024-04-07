import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

export function getToken() {
  return Platform.OS !== 'web'
    ? SecureStore.getItem('token')
    : localStorage.getItem('token')
}

export function setToken(token: string) {
  if (Platform.OS !== 'web') {
    SecureStore.setItem('token', token)
  } else {
    localStorage.setItem('token', token)
  }
}

export async function removeToken() {
  if (Platform.OS !== 'web') {
    await SecureStore.deleteItemAsync('token')
  } else {
    localStorage.removeItem('token')
  }
}
