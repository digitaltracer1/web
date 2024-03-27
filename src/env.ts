import { z } from 'zod'

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  GOOGLE_MAPS_API_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variable',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variable.')
}

export const env = parsedEnv.data
