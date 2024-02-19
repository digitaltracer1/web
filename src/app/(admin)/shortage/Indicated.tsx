/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import React from 'react'

export default async function Indicated() {
  const result = await fetch(
    'https://digitaltracer.ddns.com.br/v1/siac/indicated',
  )

  const { shortages: indicated } = await result.json()

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableHead>Indice</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Data da solicitação</TableHead>
            <TableHead>Similares</TableHead>
          </TableHeader>
          <TableBody>
            {indicated.length > 0
              ? indicated.map((item, index) => (
                  <TableRow key={item.NUM_FAB}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.NUM_FAB}</TableCell>
                    <TableCell>{item.PrimeiroDeSOLICITADO}</TableCell>
                    <TableCell width={20}>
                      {item.integration?.product?.products_connect?.products?.map(
                        (product, index) => (
                          <React.Fragment key={product.num_factory}>
                            <span>{product?.product_id}</span>
                            {index <
                              item.integration.product.products_connect.products
                                .length -
                                1 && <span className="separator">, </span>}
                          </React.Fragment>
                        ),
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
