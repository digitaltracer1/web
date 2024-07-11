import SellerInfo from './SellerInfo'
import HeaderSeller from './header-seller'
import SellerProviderData from './seller-provider'

export interface SellerProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SellerProps) {
  return {
    title: `${params.id}`,
  }
}

export default async function Product({ params }: SellerProps) {
  return (
    <SellerProviderData id={params.id}>
      <HeaderSeller params={params} />
      <SellerInfo params={params} />
    </SellerProviderData>
  )
}
