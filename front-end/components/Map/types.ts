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
  onLocationChange?: (location: MapLocation | undefined) => void
}

export { MapLocation, MapProps }
