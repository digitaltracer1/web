import { ClientInfo } from './client'

export interface SummaryResult {
  sellerId: string
  soldAmount: number
  valueSold: number
  canceledAmount: number
  valueCanceled: number
  devolutionAmount: number
  valueDevolution: number
}

interface OutroTeste {
  clientInfo: ClientInfo
}

interface Teste {
  sales: OutroTeste[]
}

export interface SalesDetail {
  productId: string
  productName: string
  valueSold: number
  soldAmount: number
  clientInfo: ClientInfo
  sales: Teste[]
}

export interface DataSellerInfo {
  sellerId: string
  sellerName: string
  summary?: SummaryResult
  sales: SalesDetail[]
}
