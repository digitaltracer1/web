import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import FormSignIn from './formSignin'
import Logo from './logo'

export default async function SignIn() {
  const session = await getServerSession()

  if (session) {
    const pathName = cookies().get('baseUrl')?.value as string
    redirect(pathName)
  }

  return (
    <div className="flex h-screen  items-stretch ">
      <div className="flex w-full max-w-screen-md flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center ">
          <Logo />

          <h1 className="mt-6 mb-6  text-3xl ">Faça seu logon</h1>
          <FormSignIn />
        </div>
      </div>
      <div
        className="flex-1 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://uploaddeimagens.com.br/images/004/474/631/original/imagen-signin.png?1684540485')",
        }}
      />
    </div>
  )
}
