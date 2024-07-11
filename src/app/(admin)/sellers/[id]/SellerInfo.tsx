import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'

import BarChartSales from './(charts)/BarChartSales'
import CancelChartSeller from './(charts)/CanceledChartSeller'
import ChartSeller from './(charts)/ChartSeller'
import ReturnChartSeller from './(charts)/ReturnChartSeller'
import { SellerProps } from './page'
import TopClientsList from './table-top-clients'
import MapSeller from './(charts)/map-seller'

export default function SellerInfo({ params }: SellerProps) {
  return (
    <div className="flex flex-col">
      <div className="h-96">
        {/* Primeira area */}
        <div className="px-4 py-2 h-full grid grid-cols-[0.7fr,0.4fr,0.4fr,0.6fr] gap-4">
          {/* Vou decidir  */}
          <div className="w-full shadow-lg dark:shadow-zinc-800 border rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 justify-center items-center flex">
            <Suspense fallback={<div>Loading...</div>}>
              <ChartSeller params={params} />
            </Suspense>
          </div>
          {/* Cancelamentos e devoluções */}
          <div className="flex flex-col h-full">
            <div className="h-full dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border mb-4 shadow-lg dark:shadow-zinc-800 rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex">
                <Suspense fallback={<div>Loading...</div>}>
                  <CancelChartSeller params={params} />
                </Suspense>
              </div>
            </div>
            <div className="h-full dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800 rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex ">
                <Suspense fallback={<div>Loading...</div>}>
                  <ReturnChartSeller params={params} />
                </Suspense>
              </div>
            </div>
          </div>
          {/* Mapa venda por area */}
          <div className=" shadow-lg dark:shadow-zinc-800 border rounded-lg col-span-2 dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 flex justify-center items-center px-4 py-4">
            <div className="w-full h-full rounded-lg overflow-hidden ">
              <Suspense
                fallback={
                  <Skeleton className="w-full rounded-lg  dark:bg-zinc-800 bg-zinc-50"></Skeleton>
                }
              >
                <MapSeller params={params} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="h-96">
        {/* Segunda area */}
        <div className="px-4 py-2 h-full grid grid-cols-[0.7fr,0.4fr,0.4fr,0.6fr] gap-4">
          {/* Srea Dounghut */}
          <div className="w-full rounded-lg dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 border shadow-lg dark:shadow-zinc-800 ">
            <TopClientsList params={{ id: params.id }} />
          </div>
          {/* Grafico barra */}
          <div className="h-full shadow-lg dark:shadow-zinc-800 border rounded-lg col-start-2 col-span-3 dark:border-zinc-700 dark:bg-zinc-800 bg-zinc-50 flex justify-center items-center px-4 py-4">
            <div className="w-full h-full rounded-lg overflow-hidden ">
              <Suspense fallback={<div>Loading...</div>}>
                <BarChartSales params={{ id: params.id }} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
