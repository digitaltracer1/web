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

export interface SalesDetail {
  productId: string
  productName: string
  valueSold: number
  soldAmount: number
  clientInfo: ClientInfo
}

export interface DataSellerInfo {
  sellerId: string
  sellerName: string
  summary?: SummaryResult
  sales: SalesDetail[]
}
