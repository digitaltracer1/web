'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import logoDark from '../../../assets/logo-black-theme.svg'
import logoLight from '../../../assets/logo-ligth-theme.svg'
import { useState, useEffect } from 'react'

export default function Logo() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Image src={logoDark} alt="DGT" />
  }

  return (
    <Image src={resolvedTheme === 'dark' ? logoDark : logoLight} alt="DGT" />
  )
}
