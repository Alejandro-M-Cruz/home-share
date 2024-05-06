const WEB_MAP = {
  initialCenter: { latitude: 20, longitude: 0 },
  initialZoom: 2.4,
  focusZoom: 18,
  endedFocusZoom: 15
}

const NATIVE_MAP = {
  initialRegion: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 90,
    longitudeDelta: 90
  },
  focusDeltas: {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }
}

export { WEB_MAP, NATIVE_MAP }
