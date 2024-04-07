import * as Device from 'expo-device'

export function getDeviceName() {
  return Device.deviceName ?? 'web'
}
