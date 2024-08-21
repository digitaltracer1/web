import HeaderSeller from '@/app/(admin)/sellers/[id]/header-seller'
import GoalsForm, { GoalProps } from '@/components/goals-form/goals-form'

export default function CreateGoal({ params }: GoalProps) {
  return (
    <>
      <HeaderSeller params={params} showMonthPicker={false} />
      <GoalsForm params={params} mode={'create'} />
    </>
  )
}
