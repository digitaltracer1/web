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

export interface OrderSummary {
  storeId: string
  orderId: string
  value: number
  date: string
}

export interface ClientSummary {
  clientId: string
  clientName: string
  businessName: string
  address: string
  neighborhood: string
  postalCode: string

  valueBought: number
  amountBought: number
  valueDevolution: number
  amountDevolution: number
  valueCanceled: number
  amountCanceled: number
  orders: OrderSummary[]
}

export interface SalesData {
  sellerId: string
  sellerName: string
  clients: ClientSummary[]
}
