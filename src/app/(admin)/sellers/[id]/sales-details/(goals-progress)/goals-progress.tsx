import ProgressBar from '@/components/progress-bar'
import { Badge } from '@/components/ui/badge'

export interface GoalsProgressProps {
  name: string
  bonus: number
  target: number
  progress: number // Progresso atual (como % de cancelamento, por exemplo)
  isInverted?: boolean // Propriedade opcional para indicar progresso invertido
}

export default function GoalsProgressComponent({
  name,
  bonus,
  target,
  progress,
  isInverted = false,
}: GoalsProgressProps) {
  return (
    <div>
      <div className="flex w-full justify-between items-center px-1 pb-1">
        <h1 className="text-xs font-extrabold">{name}</h1>
        <div className="flex items-end">
          <Badge className="text-[10px]" variant="default">
            {bonus.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Badge>
        </div>
      </div>
      <ProgressBar progress={progress} inverted={isInverted} target={target} />
    </div>
  )
}
