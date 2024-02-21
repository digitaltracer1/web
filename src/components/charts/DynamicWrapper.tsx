import React, { useState, useEffect, ReactNode } from 'react'

import { NextPage } from 'next'

type Props = {
  children: ReactNode
}

const DynamicWrapper: NextPage<Props> = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div>
      {!isClient && <p>Carregando...</p>}
      {isClient && children}
    </div>
  )
}

export default DynamicWrapper
