'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { ScrollArea } from '@radix-ui/react-scroll-area'

interface ISaleBySeller {
  sellerId: string
  sellerName: string
  productId: string
  productName: string
  valueSold: number
  soldAmount: number
}

export default function SaleBySeller() {
  const [saleBySeller, setSaleBySeller] = useState<ISaleBySeller[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://digitaltracer.ddns.com.br/v1/siac/sale-by-seller',
          {
            method: 'POST',
            body: JSON.stringify({
              sellerId: '0036',
              date: new Date(),
              filter: 'amount',
            }),
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const data = await response.json()
        setSaleBySeller(data.sale)
      } catch (error) {
        console.error('Error fetching sellers:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className=" space-y-4">
        <ScrollArea className=" h-56 overflow-y-auto">
          <Table>
            <TableHeader className="lg:text-lg font-extrabold">
              <TableHead>Codigo Produto</TableHead>
              <TableHead>Descrição Simples</TableHead>
              <TableHead>Valor Vendido</TableHead>
              <TableHead>Quantidade Vendida</TableHead>
            </TableHeader>
            <TableBody className="lg:text-lg ">
              {saleBySeller.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>
                    {item.valueSold.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRl',
                    })}
                  </TableCell>
                  <TableCell>{item.soldAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </>
  )
}
