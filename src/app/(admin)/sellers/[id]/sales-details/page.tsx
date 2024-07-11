import { Suspense } from 'react'
import HeaderSeller from '../header-seller'
import { SellerProps } from '../page'
import BarchartGoalBrands from './(charts)/(goal-brands)'
import GoalsProgress from './goals-progress'
import ChartSalesTarget from './(charts)/(sales-target)'

/* <li>• Meta de vendas (por dia / semana / mês / ano / período </li>
  <li>• Meta de Marcas/Seção de produtos</li> */

const goals = [
  { name: 'Meta Valor', bonus: 200 },
  { name: 'Meta Cancelamento', bonus: 100 },
  { name: 'Meta Devolução', bonus: 100 },
  { name: 'Meta resgate cliente', bonus: 150 },
  { name: 'Meta Marcas', bonus: 300 },
  { name: 'Meta ticket médio', bonus: 140 },
]

export default function SalesDetails({ params }: SellerProps) {
  return (
    <div className="flex flex-col h-appContent">
      <HeaderSeller params={{ id: params.id }}></HeaderSeller>

      <div className="h-full px-4 py-2 grid grid-cols-4 gap-4">
        <div className="w-full h-full col-span-3 space-y-4">
          <div className="w-full h-[48.5%] rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800">
            {/* • Relatorio de vendas ( por dia / semana / mês / ano / período ) */}
            <Suspense fallback={<div>Loading...</div>}>
              <ChartSalesTarget params={{ id: params.id }} />
            </Suspense>
          </div>
          <div className="w-full h-[48.5%] rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800">
            <div className="p-2 w-full h-full">
              <BarchartGoalBrands />
            </div>
          </div>
        </div>
        {/* <div className="w-full h-full col-start-3 col-span-1 space-y-4">
          <div className="w-full h-[48.5%] rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800">
            teste 1
          </div>
          <div className="w-full h-[48.5%] rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800">
            teste 2
          </div>
        </div> */}
        <div className="w-full rounded-lg col-start-4 dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800 ">
          <h1 className="text-sm text-center font-semibold py-2 ">Resumo</h1>
          <div className="space-y-4 p-2">
            {goals.map((goal) => (
              <GoalsProgress
                key={goal.name}
                name={goal.name}
                bonus={goal.bonus}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
