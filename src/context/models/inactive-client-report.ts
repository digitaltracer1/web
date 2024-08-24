export interface InactiveClientReport {
  clientId: string
  clientName: string
  businessName: string
  createdAt: Date
  lastPurchaseDate: Date | null
  state: string
  areaCode: string
  phoneNumber: string
  lastPurchase: string
}
