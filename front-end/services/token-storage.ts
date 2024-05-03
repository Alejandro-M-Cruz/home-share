import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

async function getToken() {
  try {
    return Platform.OS !== 'web'
      ? await SecureStore.getItemAsync('token')
      : localStorage.getItem('token')
  } catch {
    console.error('Failed to get token from storage')
    return null
  }
}

async function setToken(token: string) {
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

async function removeToken() {
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

export { getToken, setToken, removeToken }
