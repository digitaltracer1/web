import { PolygonProps } from '@react-google-maps/api'
import ceilandia from './geojson/ceilandia.geo.json'
import taguatinga from './geojson/taguatinga.geo.json'
import samambaia from './geojson/samambaia.geo.json'

const polygonOptions: PolygonProps['options'] = {
  fillColor: 'transparent',
  strokeOpacity: 1,
  strokeWeight: 1,
}

// @ts-expect-error
const convertToPolygonPaths = (geojson) => {
  // @ts-expect-error
  return geojson.features[0].geometry.coordinates[0].map((coord) => ({
    lat: coord[1],
    lng: coord[0],
  }))
}

export const polygonData = [
  {
    paths: convertToPolygonPaths(ceilandia),
    options: { ...polygonOptions, strokeColor: 'blue' },
  },
  {
    paths: convertToPolygonPaths(taguatinga),
    options: { ...polygonOptions, strokeColor: 'blue' },
  },
  {
    paths: convertToPolygonPaths(samambaia),
    options: { ...polygonOptions, strokeColor: 'blue' },
  },
]
