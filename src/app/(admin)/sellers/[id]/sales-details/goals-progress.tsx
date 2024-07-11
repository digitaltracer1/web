import ProgressBar from '@/components/progress-bar'
import { Badge } from '@/components/ui/badge'

interface GoalsProgressProps {
  name: string
  bonus: number
}

export default function GoalsProgress({ name, bonus }: GoalsProgressProps) {
  return (
    <div>
      <div className="flex w-full justify-between items-center px-1 pb-1">
        <h1 className="text-xs font-extrabold">{name}</h1>
        <div className=" flex items-end">
          <Badge className="text-[10px]" variant="default">
            {bonus.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Badge>
        </div>
      </div>
      <ProgressBar progress={Math.floor(Math.random() * 100)} />
    </div>
  )
}
