export interface SaleByProduct {
  productId: string
  productName: string
  totalValueSold: number
  totalAmountSold: number
}

export interface SaleByBrand {
  brandId: string
  brandName: string
  totalValueSold: number
  totalAmountSold: number
  products: SaleByProduct[]
}

export interface SaleByGroup {
  groupId: string
  groupName: string
  totalValueSold: number
  totalAmountSold: number
  brands: SaleByBrand[]
}

export interface SaleBySeller {
  sellerId: string
  sellerName: string
  groups: SaleByGroup[]
}
