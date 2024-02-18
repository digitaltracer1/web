// const username = 'dgt'
// const password = 'Dgt@server'
// const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

// export const fetchServer = async (
//   input: string | URL | Request,
//   init?: RequestInit | undefined,
// ): Promise<Response> => {
//   console.log(input)

//   const response = await fetch(input)

//   console.log(await response.json())

//   // const response = await fetch(input, {
//   //   ...init,
//   //   headers: {
//   //     ...init?.headers,
//   //     // ...(token && { Authorization: `Basic ${token}` }),
//   //   },
//   // })

//   console.log(response.headers.get('origin'))

//   return response
// }
