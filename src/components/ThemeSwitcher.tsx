import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonStar, Sun } from 'lucide-react'
import { Button } from './Button'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [resolvedTheme])

  if (!mounted) {
    return (
      <Button variant="custom">
        <MoonStar className="h-5 w-5 text-zinc-500 transition-all" />
        Dark
      </Button>
    )
  }

  return (
    <Button
      variant="custom"
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      {resolvedTheme === 'light' ? (
        <MoonStar className="h-5 w-5 text-zinc-500 transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-zinc-500 transition-all" />
      )}

      {resolvedTheme === 'light' ? 'Dark' : 'Light'}
    </Button>
  )
}

export default ThemeSwitch
