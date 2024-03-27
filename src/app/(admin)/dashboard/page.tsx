import { getServerSession } from 'next-auth'

export default async function Dashboard() {
  const session = await getServerSession()

  return (
    <>
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Welcome {session?.user?.name}! Please note that the dashboard is
        currently under construction
      </h1>
    </>
  )
}
