'use client'

import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { setCookie } from 'cookies-next'

interface MonthNavigationProps {
  selectMonth: (month: string) => void // Ou ajuste o tipo conforme necessário
}

export function MonthNavigation({ selectMonth }: MonthNavigationProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const changeMonth = (amount: number) => {
    const newDate =
      amount > 0
        ? addMonths(selectedDate, amount)
        : subMonths(selectedDate, Math.abs(amount))

    setSelectedDate(newDate)

    const formattedDate = newDate.toISOString()
    selectMonth(formattedDate)

    setCookie('dateSeller', formattedDate)
  }

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="flex justify-center items-center ">
      <Button variant="ghost" onClick={() => changeMonth(-1)}>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <h2 className="mx-4 w-32 text-center">
        {capitalizeFirstLetter(
          format(selectedDate, 'MMMM yyyy', { locale: ptBR }),
        )}
      </h2>
      <Button variant="ghost" onClick={() => changeMonth(1)}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
