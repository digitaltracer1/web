// import { Select } from '@/components/Form/Select'
// import { SelectItem } from '@/components/Form/Select/SelectItem'
// import fetchSellerActive from '../../../../services/integrations/siac/queries/seller-active'
// import { ApexDoughnutChart } from '@/components/Charts/ApexDoughnutChart'
// import { ApexRadialChart } from '@/components/Charts/ApexRadialBarChart'

// const chartData = {
//   labels: ['Meta 1', 'Meta 2', 'Meta 3', 'Meta 4'],
//   series: [
//     Math.floor(Math.random() * 100),
//     Math.floor(Math.random() * 100),
//     Math.floor(Math.random() * 100),
//     Math.floor(Math.random() * 100),
//   ],
// }

export default async function Sellers() {
  // const sellers = await fetchSellerActive()

  return (
    <>
      <div className="flex items-center gap-10 lg:gap-20">
        <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
          Sellers under construction
        </h1>

        <div className="flex w-80 ">
          {/* <Select placeholder="Select a seller...">
            {sellers.map((seller) => (
              <SelectItem
                key={seller.id}
                value={seller.id}
                text={seller.name}
              />
            ))}
          </Select> */}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex h-80 w-80 items-center justify-center bg-zinc-600 ">
          {/* <ApexDoughnutChart data={chartData} /> */}
        </div>
        <div className="flex h-80 w-80 items-center justify-center bg-zinc-600 ">
          {/* <ApexRadialChart
            data={chartData}
            className="peer-[apexcharts-legend]:absolute  "
          /> */}
        </div>
      </div>
    </>
  )
}
