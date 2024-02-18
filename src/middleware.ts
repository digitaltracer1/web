import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const response = NextResponse.next()

    const beforeUrl = req.cookies.get('baseUrl')?.value as string
    const pathAfterDomain = beforeUrl
      ? beforeUrl.split(process.env.NEXTAUTH_URL || '')[1]
      : undefined

    const currentUrl = req.url.split(process.env.NEXTAUTH_URL || '')[1]

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
