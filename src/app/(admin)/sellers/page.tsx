import { revalidateTag } from 'next/cache'
import ComboBoxSeller, { ICombobox } from './ComboboxSeller'
import { cookies } from 'next/headers'
import TableSaleBySeller from './(sale-by-seller)/table'

export default async function Page() {
  async function handleChangeSeller(seller: ICombobox | null) {
    'use server'

    if (seller) {
      console.log(seller.sellerId, seller.label)
      const sellerId = seller.sellerId as string
      cookies().set('sellerId', sellerId)

      revalidateTag('get-sale-by-seller')
    }
  }

  return (
    <>
      <ComboBoxSeller selectSeller={handleChangeSeller} />

      <TableSaleBySeller />
    </>
  )
}
