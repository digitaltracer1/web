'use client'

import React, { useState } from 'react'
import { Button } from '../Button'

interface ToggleButtonProps {
  options: string[]
  onToggle: (selected: string) => void
}

export default function ToggleButton({ options, onToggle }: ToggleButtonProps) {
  const [selected, setSelected] = useState(options[0])

  const handleToggle = (option: string) => {
    setSelected(option)
    onToggle(option)
  }

  return (
    <div className="flex border rounded overflow-hidden">
      {options.map((option) => (
        <Button
          variant="toggle"
          key={option}
          onClick={() => handleToggle(option)}
          className={`text-xs rounded-none text-center flex justify-center items-center ${
            selected === option
              ? 'bg-orange-400 text-white hover:bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700'
              : 'border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700'
          }`}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
