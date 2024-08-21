import GoalsForm, { GoalProps } from '@/components/goals-form/goals-form'
import HeaderSeller from '@/app/(admin)/sellers/[id]/header-seller'

export default function UpdateGoal({ params }: GoalProps) {
  return (
    <>
      <HeaderSeller params={params} showMonthPicker={false} />
      <GoalsForm params={params} mode={'update'} />
    </>
  )
}
