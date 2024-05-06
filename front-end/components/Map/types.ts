type MapLocation = {
  id?: number
  latitude: number
  longitude: number
  street?: string
}

type MapProps = {
  locations: MapLocation[]
  initialCenter?: { latitude: number; longitude: number }
  initialZoom?: number
}

export { MapLocation, MapProps }
