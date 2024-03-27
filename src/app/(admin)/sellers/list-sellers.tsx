'use client'

import UserListItem from '@/components/info-list-seller'
import { useSeller } from '@/context/seller-context'

export default function ListSellers() {
  const { info } = useSeller()

  return (
    <div>
      <h1 className="text-lg  ">Vendedores</h1>
      <div className="py-4 space-y-4 flex flex-col mx-4 ">
        {info?.sellers.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
