type MapLocation = {
  id?: number
  latitude: number
  longitude: number
  street?: string
}

type MapProps = {
  locations: MapLocation[]
}

export { MapLocation, MapProps }