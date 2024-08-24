import React, { ComponentProps, forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500',
    'active:opacity-80',
  ],

  variants: {
    variant: {
      primary:
        'bg-orange-400 text-white hover:bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700',
      ghost:
        'rounded-md px-2 hover:bg-zinc-50 dark:hover:bg-white/5 shadow-none text-zinc-500 dark:text-zinc-400',
      outline:
        'border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
      dgt: 'mt-4 h-14 w-full rounded-lg bg-orange-ff9000 px-4 py-0 font-medium text-background-dgt transition duration-200 hover:bg-orange-shade',
      custom: [
        'w-full text-base font-medium text-zinc-700 hover:text-orange-500  ',
        'shadow-none flex items-center gap-3 rounded px-3 py-2 hover:bg-orange-50 ',
        'dark:hover:text-orange-300 dark:hover:bg-zinc-800 dark:text-zinc-100',
      ],
      toggle: [
        'w-full font-medium py-1',
        'flex items-center ',
        'dark:text-zinc-100',
      ],
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <button ref={ref} {...props} className={button({ variant, className })} />
    )
  },
)

Button.displayName = 'Button'
