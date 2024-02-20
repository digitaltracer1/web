import { cookies } from 'next/headers'
import { ISaleBySeller, columns } from './columns'
import { DataTable } from './data-table'

async function getData(): Promise<ISaleBySeller[]> {
  const sellerId = cookies().get('sellerId')

  const response = await fetch(
    'https://digitaltracer.ddns.com.br/v1/siac/sale-by-seller',
    {
      next: {
        tags: ['get-sale-by-seller'],
      },
      method: 'POST',
      body: JSON.stringify({
        sellerId: sellerId?.value,
        date: new Date(),
        filter: 'value',
      }),
      headers: { 'Content-Type': 'application/json' },
    },
  )

  const data = (await response.json()) as { sale: ISaleBySeller[] }
  // Fetch data from your API here.
  data.sale.forEach((sale, index: number) => {
    sale.index = index + 1
  })

  return data.sale
}

export default async function TableSaleBySeller() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
