import SellerInfo from '../SellerInfo'
import HeaderSeller from './header-seller'

export interface SellerProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SellerProps) {
  return {
    title: `Vendedor ${params.id}`,
  }
}

export default async function Product({ params }: SellerProps) {
  return (
    <>
      <HeaderSeller params={params} />
      <SellerInfo params={params} />
    </>
  )
}
