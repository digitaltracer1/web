import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

const handler = NextAuth({
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        nickName: { label: 'nickName', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        if (!credentials) {
          return null
        }

        const res = await fetch('https://poscrisma.ddns.com.br/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            nickName: credentials.nickName,
            password: credentials.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (!res.ok) {
          return null
        }

        const token = await res.json()

        const result = await fetch(
          'https://poscrisma.ddns.com.br/v1/auth/profile',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.data.access_token}`,
            },
          },
        )

        const profile = await result.json()

        cookies().set('jwt', token.data.access_token)
        cookies().set('profile', JSON.stringify(profile.data))

        return {
          id: profile.data.userId,
          email: profile.data.email,
          name: profile.data.name,
        }
      },
    }),
  ],
  events: {
    async signOut() {
      const cookiesData = cookies().getAll()

      cookiesData.forEach((cookie) => {
        cookies().delete(cookie.name)
      })
    },
  },
})

export { handler as GET, handler as POST }
