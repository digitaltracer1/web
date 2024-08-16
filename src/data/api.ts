export function api(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const apiPrefix = '/v1'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
