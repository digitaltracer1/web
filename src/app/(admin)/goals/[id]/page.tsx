import HeaderSeller from '../../sellers/[id]/header-seller'
import SellerProviderData from '../../sellers/[id]/seller-provider'
import GoalsList from '../list-goals-seller'

export interface SellerProps {
  params: {
    id: string
    goalId: string
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
      <HeaderSeller params={params} showMonthPicker={false} />
      <GoalsList sellerId={params.id} />
    </SellerProviderData>
  )
}
