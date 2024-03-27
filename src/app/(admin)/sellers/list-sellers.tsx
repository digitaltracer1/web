'use client'

import UserListItem from '@/components/info-list-seller'
import { Skeleton } from '@/components/ui/skeleton'
import { useSeller } from '@/context/seller-context'

export default function ListSellers() {
  const { info } = useSeller()

  return (
    <div>
      <h1 className="text-lg  ">Vendedores</h1>
      <div className="py-4 space-y-4 flex flex-col mx-4 ">
        {info ? (
          info?.sellers.map((user) => (
            <UserListItem key={user.sellerId} user={user} />
          ))
        ) : (
          <div className="py-4 space-y-4 flex flex-col mx-4 ">
            {Array.from({ length: 10 }, (_, index) => (
              <Skeleton
                key={index}
                className="flex items-center p-4 border-b shadow-sm rounded-lg border dark:border-zinc-700 dark:bg-zinc-800"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="ml-4 space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </Skeleton>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
