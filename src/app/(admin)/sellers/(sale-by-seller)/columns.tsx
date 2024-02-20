'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  productId: string
  description: string
  soldValue: number
  soldAmount: number
}

export type ISaleBySeller = {
  index?: number
  sellerId?: string
  sellerName?: string
  productName?: string
  productId: string
  valueSold: number
  soldAmount: number
}

export const columns: ColumnDef<ISaleBySeller>[] = [
  {
    accessorKey: 'index',
    header: '',
  },
  {
    accessorKey: 'productId',
    header: 'Codigo Produto',
  },
  {
    accessorKey: 'valueSold',
    header: 'Valor',
    cell: ({ row }) => {
      const valueSold = parseFloat(row.getValue('valueSold'))

      const formatted = valueSold.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRl',
      })

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'soldAmount',
    header: 'Quantidade',
  },
]
