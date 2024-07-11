'use client'

import React from 'react'
import ToggleButton from '.'

export default function ToggleButtonComponent() {
  const handleToggle = (selected: string) => {
    console.log(`Selected option: ${selected}`)
    // Adicione aqui a lógica para tratar a alternância de "Quantidade" e "Valor"
  }

  return (
    <div className="p-4">
      <ToggleButton options={['Quantidade', 'Valor']} onToggle={handleToggle} />
    </div>
  )
}
