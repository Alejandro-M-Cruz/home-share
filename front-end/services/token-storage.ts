import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import {getCookie, removeCookie, setCookie} from "@/helpers/cookies";

const TOKEN_KEY_NAME = 'api-token'

async function getToken() {
  try {
    return Platform.OS !== 'web'
      ? await SecureStore.getItemAsync(TOKEN_KEY_NAME)
      : getCookie(TOKEN_KEY_NAME)
  } catch {
    console.error('Failed to get token from storage')
    return null
  }
}

async function setToken(token: string) {
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(TOKEN_KEY_NAME, token)
    } else {
      setCookie({
        name: TOKEN_KEY_NAME,
        value: token,
        expiresInDays: 30,
        isSecure: true
      })
    }
  } catch {
    console.error('Failed to set token in storage')
  }
}

async function removeToken() {
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync(TOKEN_KEY_NAME)
    } else {
      removeCookie(TOKEN_KEY_NAME)
    }
  } catch {
    console.error('Failed to remove token from storage')
  }
}

export { getToken, setToken, removeToken }
