import { env } from '@/env'

// app/api/geocode.route.ts
type GeoResponse = {
  lat?: number
  lng?: number
  error?: string
}

export async function GET(request: Request) {
  const urlParams = new URL(request.url)
  const address = urlParams.searchParams.get('address')

  console.log(address)

  if (!address) {
    return new Response(
      JSON.stringify({ error: 'Endereço não fornecido corretamente.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const apiKey = env.GOOGLE_MAPS_API_KEY
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address,
  )}&key=${apiKey}`

  try {
    const geocodeResponse = await fetch(geocodeUrl)
    const geocodeData = await geocodeResponse.json()

    if (geocodeData.status === 'OK') {
      const location = geocodeData.results[0].geometry.location
      const geoResponse: GeoResponse = {
        lat: location.lat,
        lng: location.lng,
      }
      return new Response(JSON.stringify(geoResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      return new Response(
        JSON.stringify({ error: 'Localização não encontrada.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      )
    }
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: 'Erro ao processar a solicitação.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
