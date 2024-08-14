import GoalsForm from '@/components/goals-form/goals-form'
import { SellerProps } from '../../[id]/page'
import HeaderSeller from '@/app/(admin)/sellers/[id]/header-seller'

export default function CreateGoal({ params }: SellerProps) {
  return (
    <>
      <HeaderSeller params={params} showMonthPicker={false} />
      <GoalsForm params={params} mode={'create'} />
    </>
  )
}
