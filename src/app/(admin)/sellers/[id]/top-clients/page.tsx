import InactiveClientsBarChart from '@/components/charts/apexchart/linechart-inactive-clients'
import NewClientsScatterPlot from '@/components/charts/apexchart/scatterplot-newclients'
import { Suspense } from 'react'
import HeaderSeller from '../header-seller'
import { SellerProps } from '../page'
import { AverageTicketChart } from './chart-average-ticket'
import Clients from './clients'

/* 
  • Relatorio de clientes (abertura de novos clientes) indicador de data
de cadastro e data de 1º venda para esse cliente
  • Relatorio de clientes inativos (por período) - OK 
  • Relatorio de ticket médio de cada cliente - OK
*/

export default function TopClients({ params }: SellerProps) {
  return (
    <div className="flex flex-col">
      <HeaderSeller params={{ id: params.id }}></HeaderSeller>

      <div className="h-full px-4 py-2 grid grid-cols-[0.7fr,0.4fr,0.4fr,0.6fr] gap-4">
        <div className="w-full  col-span-1 rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800 ">
          <Clients id={params.id} />
        </div>

        <div className="h-full col-start-2 col-span-3 space-y-4 flex flex-col">
          <div className="flex-grow h-1/2 flex items-center justify-center rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800">
            <AverageTicketChart />
          </div>
          <div className="flex-grow h-1/2 flex items-center justify-center">
            <div className="h-full w-full flex gap-4 ">
              <div className="flex-grow w-1/2 p-4 flex items-center justify-center rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800">
                <Suspense fallback={<div>Loading...</div>}>
                  <InactiveClientsBarChart />
                </Suspense>
              </div>
              <div className="flex-grow w-1/2 flex items-center justify-center rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800">
                <Suspense fallback={<div>Loading...</div>}>
                  <NewClientsScatterPlot />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
