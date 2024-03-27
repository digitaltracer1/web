// Assuming ChartSeller is a lazy-loaded component
// import { Suspense, lazy } from 'react';
// const ChartSeller = lazy(() => import('./ChartSeller'));

import { Suspense } from 'react'
import BarChartSeller from './(charts)/BarChartSeller'
import CancelChartSeller from './(charts)/CanceledChartSeller'
import ChartSeller from './(charts)/ChartSeller'
import ReturnChartSeller from './(charts)/ReturnChartSeller'
import MapSeller from './[id]/map-seller'
import { SellerProps } from './[id]/page'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SellerInfo({ params }: SellerProps) {
  return (
    <div className="h-appContent max-h-appContent flex flex-col">
      <div className="h-96">
        {/* Primeira area */}
        <div className="px-4 py-2 h-full grid grid-cols-[0.7fr,0.4fr,0.4fr,0.6fr] gap-4">
          {/* Vou decidir  */}
          <div className="w-full shadow-xl border rounded-lg dark:border-zinc-700 dark:bg-zinc-800 justify-center items-center flex">
            <Suspense fallback={<div>Loading...</div>}>
              <ChartSeller />
            </Suspense>
          </div>
          {/* Cancelamentos e devoluções */}
          <div className="flex flex-col h-full">
            <div className="h-full dark:border-zinc-700 dark:bg-zinc-800 border mb-4 shadow-xl rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex">
                <Suspense fallback={<div>Loading...</div>}>
                  <CancelChartSeller params={params} />
                </Suspense>
              </div>
            </div>
            <div className="h-full dark:border-zinc-700 dark:bg-zinc-800 border shadow-xl rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex ">
                <Suspense fallback={<div>Loading...</div>}>
                  <ReturnChartSeller params={params} />
                </Suspense>
              </div>
            </div>
          </div>
          {/* Mapa venda por area */}
          <div className=" shadow-xl border rounded-lg col-span-2 dark:border-zinc-700 dark:bg-zinc-800 flex justify-center items-center px-4 py-4">
            <div className="w-full h-full rounded-lg overflow-hidden ">
              <Suspense fallback={<div>Loading...</div>}>
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
          <div className="flex flex-col space-y-4 ">
            <div className="flex-grow h-1/2 dark:border-zinc-700 dark:bg-zinc-800 border  shadow-xl rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex">
                <Suspense fallback={<div>Loading...</div>}>
                  <CancelChartSeller params={params} />
                </Suspense>
              </div>
            </div>
            <div className="flex-grow h-1/2 dark:border-zinc-700 dark:bg-zinc-800 border shadow-xl rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex">
                <Suspense fallback={<div>Loading...</div>}>
                  <ReturnChartSeller params={params} />
                </Suspense>
              </div>
            </div>
          </div>
          {/* Grafico barra */}
          <div className=" shadow-xl border rounded-lg col-start-2 col-span-3 dark:border-zinc-700 dark:bg-zinc-800 flex justify-center items-center px-4 py-4">
            <div className="w-full h-full rounded-lg overflow-hidden ">
              <Suspense fallback={<div>Loading...</div>}>
                <BarChartSeller params={params} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
