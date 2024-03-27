import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { env } from './env'

export default withAuth(
  function middleware(req) {
    const response = NextResponse.next()

    const beforeUrl = req.cookies.get('baseUrl')?.value as string
    const pathAfterDomain = beforeUrl
      ? beforeUrl.split(env.NEXTAUTH_URL)[1]
      : undefined

    const currentUrl = req.url.split(env.NEXTAUTH_URL)[1]

    if (pathAfterDomain !== currentUrl && currentUrl !== '/signin') {
      response.cookies.set('baseUrl', currentUrl)
    }

    return response
  },
  {
    pages: {
      signIn: '/signin',
    },
  },
)
