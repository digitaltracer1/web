import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const origin = request.headers.get('origin')
  console.log(origin)

  const res = await fetch('https://jsonplaceholder.typicode.com/todos')

  const todos = await res.json()

  return new NextResponse(JSON.stringify(todos), {
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')

  const res = await fetch('https://jsonplaceholder.typicode.com/todos')

  const todos = await res.json()

  return new NextResponse(JSON.stringify(todos), {
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
