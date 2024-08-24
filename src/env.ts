import { z } from 'zod'

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse({
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variable',
    parsedEnv.error.flatten().fieldErrors,
  )

  console.log('Current environment variables:', process.env)
  throw new Error('Invalid environment variable.')
}

export const env = parsedEnv.data
