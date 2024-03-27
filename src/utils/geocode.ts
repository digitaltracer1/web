// utils/geocode.ts
import axios from 'axios'

type GeocodeResult = {
  latitude: number
  longitude: number
} | null

export async function geocodeAddress(
  address: string,
  apiKey: string,
): Promise<GeocodeResult> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location
      return { latitude: lat, longitude: lng }
    } else {
      // Trata outros status como erro ou zero resultados
      console.error(`Geocoding error: ${data.status}`)
      return null
    }
  } catch (error) {
    console.error(`Geocoding request failed: ${error}`)
    return null
  }
}
