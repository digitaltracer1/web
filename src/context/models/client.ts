export interface ClientInfo {
  clientId: string
  clientName: string
  address: string
  postalCode: string
  neighborhood: string
  businessName: string
  geojson?: {
    name: string
    lat: number
    lng: number
  }
}
