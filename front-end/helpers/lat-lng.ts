function latLng({
  latitude,
  longitude
}: {
  latitude: number
  longitude: number
}) {
  return { lat: latitude, lng: longitude }
}

function zoomToDeltas(zoom: number) {
  return {
    latitudeDelta: 360 / Math.pow(2, zoom),
    longitudeDelta: 360 / Math.pow(2, zoom)
  }
}

export { latLng, zoomToDeltas }
