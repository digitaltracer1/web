'use client'

import { Button } from '@/components/Button'
import { Mail, Eye, EyeOff, Lock } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import * as Input from '@/components/Input'

export default function FormSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [hidden, setHidden] = useState(false)
  const [imputFocused, setImputFocused] = useState(false)

  useEffect(() => {
    setHidden(false)
    setImputFocused(false)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = {
      nickName: email,
      password,
    }
    signIn('credentials', {
      ...data,
      callbackUrl: '/dashboard',
    })
  }

  return (
    <form
      className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-700"
      onSubmit={handleSubmit}
      action=""
    >
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-6">
          <Input.Root>
            <Mail className=" h-5 w-5 text-zinc-500" />
            <Input.Control
              id="email"
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Input.Root>

          <div className="flex flex-col gap-3 lg:block">
            <Input.Root>
              <Lock className="h-5 w-5 text-zinc-500" />
              <Input.Control
                id="password"
                type={hidden ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                onBlur={() => {
                  setHidden(false)
                }}
                onFocus={() => {
                  setImputFocused(true)
                }}
              />
              <Button
                variant="ghost"
                className="py-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                type="button"
                onBlur={() => {
                  if (!imputFocused) {
                    setHidden(false)
                  }
                }}
                onClick={() => {
                  setHidden(hidden !== true)
                }}
              >
                {hidden === true ? (
                  <Eye className="h-5 w-5 text-zinc-500" />
                ) : (
                  <EyeOff className="h-5 w-5 text-zinc-500" />
                )}
              </Button>
            </Input.Root>
          </div>
        </div>
      </div>

      <Button variant="primary" type="submit">
        Entrar
      </Button>
    </form>
  )
}
