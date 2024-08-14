'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { differenceInMonths, format, isBefore } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useSeller } from '@/context/seller-context'
import { PopoverClose } from '@radix-ui/react-popover'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface AnimationState {
  animation: 'slideInFromLeft' | 'slideInFromRight' | ''
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

interface MonthPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  allowRangeSelection?: boolean // Nova propriedade para controlar a seleção de intervalo
}

export default function MonthPicker({
  className,
  allowRangeSelection = true, // Por padrão, a seleção de intervalo é permitida
}: MonthPickerProps) {
  const { dateRange, updateDateRange } = useSeller()
  const [selectedYear, setSelectedYear] = useState<number>(
    dateRange.dateFrom
      ? new Date(dateRange.dateFrom).getFullYear()
      : new Date().getFullYear(),
  )

  const [startMonth, setStartMonth] = useState<Date | undefined>(
    dateRange.dateFrom ? new Date(dateRange.dateFrom) : undefined,
  )
  const [endMonth, setEndMonth] = useState<Date | undefined>(
    dateRange.dateTo ? new Date(dateRange.dateTo) : undefined,
  )
  const [proposedStartMonth, setProposedStartMonth] = useState<
    Date | undefined
  >(dateRange.dateFrom ? new Date(dateRange.dateFrom) : undefined)
  const [proposedEndMonth, setProposedEndMonth] = useState<Date | undefined>(
    dateRange.dateTo ? new Date(dateRange.dateTo) : undefined,
  )
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [animation, setAnimation] = useState<AnimationState['animation']>('')

  useEffect(() => {
    if (startMonth && !endMonth) {
      setProposedStartMonth(startMonth)
    } else if (startMonth && endMonth) {
      setProposedStartMonth(startMonth)
      setProposedEndMonth(endMonth)
    }
  }, [])

  const handleMonthClick = (monthIndex: number) => {
    const newMonth = new Date(selectedYear, monthIndex)

    if (!allowRangeSelection) {
      // Se a seleção de intervalo não for permitida, selecione apenas um mês
      setProposedStartMonth(newMonth)
      setProposedEndMonth(undefined)
      return
    }

    if (!proposedStartMonth || (proposedStartMonth && proposedEndMonth)) {
      setProposedStartMonth(newMonth)
      setProposedEndMonth(undefined)
    } else if (allowRangeSelection && proposedStartMonth && !proposedEndMonth) {
      if (isBefore(newMonth, proposedStartMonth)) {
        setProposedStartMonth(newMonth)
        setProposedEndMonth(undefined)
      } else if (differenceInMonths(newMonth, proposedStartMonth) > 5) {
        setIsDialogOpen(true)
      } else {
        setProposedEndMonth(newMonth)
      }
    }
  }

  const handleYearChange = (direction: 'increment' | 'decrement') => {
    setAnimation(
      direction === 'increment' ? 'slideInFromRight' : 'slideInFromLeft',
    )
    setTimeout(() => {
      setSelectedYear((prevYear) =>
        direction === 'increment' ? prevYear + 1 : prevYear - 1,
      )
      setAnimation('')
    }, 500)
  }

  const handleConfirmClick = () => {
    const start = proposedStartMonth || proposedEndMonth || new Date()
    const end = proposedEndMonth || proposedStartMonth || new Date()

    setStartMonth(proposedStartMonth)
    setEndMonth(proposedEndMonth)
    updateDateRange(start, end)
  }

  const isSelected = (monthIndex: number, year: number) => {
    if (!proposedStartMonth) return false
    const start = proposedStartMonth.getTime()
    const end = proposedEndMonth ? proposedEndMonth.getTime() : start
    const current = new Date(year, monthIndex).getTime()
    return current >= start && current <= end
  }

  const isFutureMonth = (monthIndex: number, year: number) => {
    const today = new Date()
    const selectedDate = new Date(year, monthIndex)
    return selectedDate > today
  }

  const displayDateRange = () => {
    if (proposedStartMonth && proposedEndMonth) {
      if (proposedStartMonth.getTime() === proposedEndMonth.getTime()) {
        return format(proposedStartMonth, 'MMMM yyyy', { locale: ptBR })
      } else {
        return `${format(proposedStartMonth, 'MMMM yyyy', { locale: ptBR })} - ${format(proposedEndMonth, 'MMMM yyyy', { locale: ptBR })}`
      }
    } else if (proposedStartMonth) {
      return format(proposedStartMonth, 'MMMM yyyy', { locale: ptBR })
    } else {
      return 'Selecione o Mês'
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="month"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal dark:bg-zinc-800 dark:border-zinc-700 shadow-lg dark:shadow-zinc-800 capitalize',
              !(proposedStartMonth && proposedEndMonth) &&
                'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[300px] p-4 dark:bg-zinc-800 dark:border-zinc-600 dark:shadow-xl dark:shadow-zinc-800"
          align="start"
        >
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="outline"
              className="dark:bg-zinc-700 dark:hover:bg-zinc-700/80 transition-transform duration-300 ease-in-out  hover:text-orange-300"
              onClick={() => handleYearChange('decrement')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg dark:text-white transition-all duration-300 ease-in-out transform">
              {selectedYear}
            </span>
            <Button
              variant="outline"
              className="dark:bg-zinc-700 dark:hover:bg-zinc-700/80 transition-transform duration-300 ease-in-out  hover:text-orange-300"
              onClick={() => handleYearChange('increment')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative h-44 overflow-hidden">
            <div
              className={cn(
                'absolute inset-0 grid grid-cols-3 gap-2 transition-transform duration-500 ease-in-out',
                animation === 'slideInFromLeft'
                  ? 'animate-slideInFromLeft'
                  : '',
                animation === 'slideInFromRight'
                  ? 'animate-slideInFromRight'
                  : '',
              )}
              onAnimationEnd={() => setAnimation('')}
            >
              {months.map((month, index) => (
                <Button
                  key={month}
                  variant="outline"
                  className={cn(
                    'dark:bg-zinc-700 dark:hover:bg-zinc-700/80 hover:text-orange-300 hover:bg-orange-50 transition-all duration-300 ease-in-out',
                    isSelected(index, selectedYear) &&
                      'text-white hover:text-white bg-orange-400 hover:bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700',
                  )}
                  onClick={() => handleMonthClick(index)}
                  disabled={isFutureMonth(index, selectedYear)}
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>
          <PopoverClose className="w-full">
            <Button
              variant="default"
              className="mt-4 w-full text-white hover:text-white bg-orange-400 hover:bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700"
              onClick={handleConfirmClick}
            >
              Confirmar
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limite máximo de meses</AlertDialogTitle>
            <AlertDialogDescription>
              Você pode selecionar no máximo 6 meses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
