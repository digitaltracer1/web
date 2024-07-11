interface Item {
  productId: string
  productName: string
  valueSold: number
  soldAmount: number
}

interface Sale {
  orderId: string
  storeId: string
  storeName: string
  date: string
  items: Item[]
  averageTicket?: number
  totalOrderValue?: number
}

export interface SalesDataClient {
  clientId: string
  clientName: string
  businessName: string
  address: string
  neighborhood: string
  postalCode: string
  sales: Sale[]
  averageTicket: number
  totalValueSold: number
  orderCount: number
}

export interface SalesData {
  sellerId: string
  sellerName: string
  clients: SalesDataClient[]
}
