import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import TableSaleBySeller from './(sale-by-seller)/table'
import ComboBoxSeller, { ICombobox } from './ComboboxSeller'
import { MonthNavigation } from './MonthNavigation'

export default async function Page() {
  async function handleChangeSeller(seller: ICombobox | null) {
    'use server'

    if (seller) {
      const sellerId = seller.sellerId as string
      cookies().set('sellerId', sellerId)

      revalidateTag('get-sale-by-seller')
    }
  }

  async function handleChangeMonth(month: string | null) {
    'use server'

    if (month) {
      revalidateTag('get-sale-by-seller')
    }
  }

  return (
    <>
      <div className=" sticky top-16 lg:top-0 md:flex w-full gap-4 justify-center items-center bg-white dark:bg-zinc-900 z-20">
        <div className="w-full flex justify-center items-center pt-4 md:py-4 md:w-1/6 md:items-start md:justify-start ">
          <ComboBoxSeller selectSeller={handleChangeSeller} />
        </div>
        <div className="w-full py-4">
          <MonthNavigation selectMonth={handleChangeMonth} />
        </div>
      </div>

      <div className="md:flex w-full h-screen py-4 px-4 gap-4">
        <section className="md:w-full h-20">
          <div className="text-center">Under Construction</div>
        </section>
        <section className=" md:w-1/2 2xl:w-1/3">
          <div className="h-full max-h-[calc(100%-2rem)] overflow-y-auto">
            <div className="text-center">Top produtos por vendedor</div>
            <TableSaleBySeller />
          </div>
        </section>
      </div>
    </>
  )
}
