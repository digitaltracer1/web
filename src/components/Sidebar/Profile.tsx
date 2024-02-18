import { Button } from '@/components/Button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { Avatar } from './Avatar'

interface Profile {
  name: string
  email: string
}

export function Profile() {
  const [profile, setProfile] = useState<Profile>()
  const profileCookie = getCookie('profile') as string

  useEffect(() => {
    const profileData = JSON.parse(profileCookie)
    setProfile(profileData)
  }, [profileCookie])

  return (
    <div className="grid grid-cols-profile items-center gap-3">
      {profile ? (
        <Avatar
          user={{
            name: profile.name,
            email: profile.email,
          }}
        />
      ) : (
        <div className="h-10 w-10 rounded-full animate-pulse bg-gray-300 dark:bg-zinc-400" />
      )}

      {profile ? (
        <div className="flex flex-col truncate">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-100">
            {profile?.name}
          </span>
          <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {profile?.email}
          </span>
        </div>
      ) : (
        <div className="flex flex-col truncate">
          <span className="bg-gray-300 dark:bg-zinc-400 rounded-sm animate-pulse w-32 h-4 mb-2"></span>
          <span className="bg-gray-300 dark:bg-zinc-400 rounded-sm animate-pulse w-48 h-4"></span>
        </div>
      )}
      <Button
        type="button"
        variant="ghost"
        onClick={() => {
          signOut()
        }}
      >
        <LogOut className="h-5 w-5 text-zinc-500" />
      </Button>
    </div>
  )
}
