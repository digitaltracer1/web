/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import fetchShortage from '../../../../../services/integrations/siac/queries/shortage'
import React, { useState } from 'react'

const FormSchema = z.object({
  dob: z.date({
    required_error: 'Insira uma data para buscar as faltas',
  }),
})

export interface Shortage {
  NUM_FAB: string
  SALDO: string
  ESTOQUE01: string
  MOV: string
}

export default function Daily() {
  const [shortages, setShortages] = useState<Shortage[]>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // setShortages([])
    const loja = '01'

    const resultdata = await fetchShortage({
      startDate: format(data.dob, 'yyyy-MM-dd'),
      endDate: format(data.dob, 'yyyy-MM-dd'),
      loja,
    })

    // console.log(
    //   resultdata.shortages.map((shortage) => ({
    //     sku: shortage.NUM_FAB,
    //     cost: shortage.integration.product.cost,
    //     product_id: shortage.integration.product.product_id,
    //     similares: shortage.integration.product?.products_connect?.products.map(
    //       (product) => product.product_id,
    //     ),
    //   })),
    // )

    setShortages(resultdata.shortages)
  }

  return (
    <>
      <div className="sticky top-[6rem]  bg-white dark:bg-zinc-900 z-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex items-center justify-between "
          >
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ptBR })
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Insira uma data para buscar a falta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Buscar</Button>
          </form>
        </Form>
        <div className="flex items-center justify-between"></div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-4">
        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableHead>Indice</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Ultimo custo</TableHead>
              <TableHead>Data da ultima saida</TableHead>
              <TableHead>Similares</TableHead>
            </TableHeader>
            <TableBody>
              {shortages.length > 0
                ? shortages.map((item, index) => (
                    <TableRow key={item.NUM_FAB}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.NUM_FAB}</TableCell>
                      <TableCell>
                        {' '}
                        {item.integration?.product?.cost?.toLocaleString(
                          'pt-BR',
                          {
                            style: 'currency',
                            currency: 'BRL',
                          },
                        )}
                      </TableCell>
                      <TableCell>{item.MOV}</TableCell>
                      <TableCell width={20}>
                        {item.integration?.product?.products_connect?.products?.map(
                          (product, index) => (
                            <React.Fragment key={product.num_factory}>
                              <span>{product?.product_id}</span>
                              {index <
                                item.integration.product.products_connect
                                  .products.length -
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
    </>
  )
}
