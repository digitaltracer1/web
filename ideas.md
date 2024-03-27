# File with heading

## Area de Vendas

  fazer uma lista de vendedores e ao cliar no vendedor ir para tela de infografico


      <div className="h-96  bg-amber-100 ">
        <div className="h-full px-4 grid grid-cols-[0.7fr,0.4fr,0.4fr,0.6fr] gap-4">
          {/* Cancelamentos e devoluções */}
          <div className="flex flex-col h-full">
            <div className="h-full dark:border-zinc-700 dark:bg-zinc-800 border mb-4 shadow-xl rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex">
                <Suspense fallback={<div>Loading...</div>}>
                  <CancelChartSeller />
                </Suspense>
              </div>
            </div>
            <div className="h-full dark:border-zinc-700 dark:bg-zinc-800 border shadow-xl rounded-lg justify-center items-center flex">
              <div className="w-full h-full justify-center items-center flex ">
                <Suspense fallback={<div>Loading...</div>}>
                  <ReturnChartSeller />
                </Suspense>
              </div>
            </div>
          </div>
          {/* Grafico barra */}
          <div className="col-span-3 shadow-xl border rounded-lg dark:border-zinc-700 dark:bg-zinc-800">
            <Suspense fallback={<div>Loading...</div>}>
              <BarChartSeller />
            </Suspense>
          </div>
        </div>
      </div>