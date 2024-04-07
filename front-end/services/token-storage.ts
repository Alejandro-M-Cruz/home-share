import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

export async function getToken() {
  try {
    return Platform.OS !== 'web'
      ? await SecureStore.getItemAsync('token')
      : localStorage.getItem('token')
  } catch {
    console.error('Failed to get token from storage')
    return null
  }
}

export async function setToken(token: string) {
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync('token', token)
    } else {
      localStorage.setItem('token', token)
    }
  } catch {
    console.error('Failed to set token in storage')
  }
}

export async function removeToken() {
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync('token')
    } else {
      localStorage.removeItem('token')
    }
  } catch {
    console.error('Failed to remove token from storage')
  }
}
