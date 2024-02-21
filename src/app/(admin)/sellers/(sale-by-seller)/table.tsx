import { cookies } from 'next/headers'
import { ISaleBySeller, columns } from './columns'
import { DataTable } from './data-table'
import { revalidateTag } from 'next/cache'

async function getData(): Promise<ISaleBySeller[]> {
  const sellerId = cookies().get('sellerId')
  const dateSeller = cookies().get('dateSeller')
    ? cookies().get('dateSeller')?.value
    : new Date()
  const salebySellerFilter = cookies().get('salebySellerFilter')
    ? cookies().get('salebySellerFilter')?.value
    : 'value'

  const response = await fetch(
    'https://digitaltracer.ddns.com.br/v1/siac/sale-by-seller',
    {
      next: {
        tags: ['get-sale-by-seller'],
      },
      method: 'POST',
      body: JSON.stringify({
        sellerId: sellerId?.value,
        date: dateSeller,
        filter: salebySellerFilter,
      }),
      headers: { 'Content-Type': 'application/json' },
    },
  )

  const data = (await response.json()) as { sale: ISaleBySeller[] }
  // Fetch data from your API here.
  data.sale?.forEach((sale, index: number) => {
    sale.index = index + 1
  })

  return data.sale
}

async function handleChangeFilter(filter: string | null) {
  'use server'

  if (filter) {
    revalidateTag('get-sale-by-seller')
  }
}

export default async function TableSaleBySeller() {
  const data = await getData()

  return (
    <div className="px-8 mx-auto lg:px-4 xl:px-12 py-4">
      <DataTable
        columns={columns}
        data={data}
        selectFilter={handleChangeFilter}
      />
    </div>
  )
}
