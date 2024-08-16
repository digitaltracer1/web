const fetchShortage = async ({
  startDate,
  endDate,
  loja,
}: {
  loja: string
  startDate: string
  endDate: string
}) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/siac/shortage`

    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({
        dateFrom: startDate,
        dateTo: endDate,
        store: loja,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    const result = await response.json()

    if (response.status >= 200 && response.status < 300) {
      return result
    } else {
      throw new Error('Erro ao executar a query.')
    }
  } catch (error) {
    console.error('Ocorreu um erro ao executar a query:', error)
    throw error
  }
}

export default fetchShortage
