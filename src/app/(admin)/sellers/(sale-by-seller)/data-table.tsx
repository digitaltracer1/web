'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { setCookie } from 'cookies-next'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  selectFilter: (filter: string | null) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  selectFilter,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const [filter, setFilter] = useState('value') // amount | value

  const changeFilter = () => {
    setFilter((prevFilter) => (prevFilter === 'amount' ? 'value' : 'amount'))
    selectFilter(filter)
    setCookie('salebySellerFilter', filter)
  }

  return (
    <div className="gap-4">
      <div className="flex justify-center items-center ">
        <Button variant="ghost" onClick={() => changeFilter()}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="mx-4 w-32 text-center">
          {filter === 'value' ? 'Quantidade' : 'Valor'}
        </h2>
        <Button variant="ghost" onClick={() => changeFilter()}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border  ">
        <Table>
          <TableHeader className="2xl:h-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="2xl:h-10">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-lg text-center"
                >
                  Não foi encontrado resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
