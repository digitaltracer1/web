'use client'

import { ComponentProps, useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

type InputPrefixProps = ComponentProps<'div'>

export function Prefix(props: InputPrefixProps) {
  return <div {...props} />
}

type InputControlProps =
  | (Omit<ComponentProps<'input'>, 'type'> & { type?: 'currency' })
  | ComponentProps<'input'>

export function Control({
  type = 'text',
  value: propValue = '',
  ...props
}: InputControlProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (type === 'currency') {
      // Garante que propValue é uma string única
      const stringValue = Array.isArray(propValue)
        ? propValue[0]
        : String(propValue)
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(parseFloat(stringValue.replace(/\D/g, '')) / 100)
      setValue(formattedValue)
    } else {
      setValue(propValue as string)
    }
  }, [propValue, type])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    if (type === 'currency') {
      const rawValue = newValue.replace(/\D/g, '')

      newValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(Number(rawValue) / 100)

      setValue(newValue)
      if (props.onChange) {
        const value = (Number(rawValue) / 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        e.target.value = value
        props.onChange(e)
      }
    } else {
      setValue(newValue)
      if (props.onChange) {
        props.onChange(e)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <input
      className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
      {...props}
      type={type !== 'currency' ? type : undefined}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

type InputRootProps = ComponentProps<'div'>

export function Root(props: InputRootProps) {
  return (
    <div
      className={twMerge(
        'flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm',
        'focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100',
        'dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-orange-300 dark:focus-within:ring-orange-500/20',
        props.className,
      )}
      {...props}
    />
  )
}
