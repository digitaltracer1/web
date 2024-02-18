import siac from '../../../axios/axios-siac.config'

interface Sellers {
  id: string
  name: string
  birthdate: string
  store: string
}

export default async function fetchSellerActive(): Promise<Sellers[]> {
  const query = `
    SELECT *
    FROM vendedor
    WHERE ativo='A' AND tipo='V'
  `

  try {
    const rawQuery = query.replace(/\s+/g, ' ').trim()

    const response = await siac.post('query', {
      sql: rawQuery,
    })

    if (response.status === 200) {
      const data = response.data.result
      const result: Sellers[] = data.map((item: any) => {
        const fullName: string = item.VENDEDOR
        const nameParts: string[] = fullName.split(' ')

        let name: string

        if (
          nameParts.length === 1 ||
          (item.APELIDO && item.APELIDO.trim() !== '')
        ) {
          name =
            item.APELIDO && item.APELIDO.trim() !== ''
              ? item.APELIDO.trim()
              : nameParts[0]
        } else {
          const firstName: string = nameParts[0]
          const lastName: string = nameParts[nameParts.length - 1]
          name = `${firstName} ${lastName}`
        }

        return {
          id: item.CODVEND,
          name,
          birthdate: item.NASCIMENTO,
          store: item.LOJA,
        }
      })

      return result
    } else {
      throw new Error('Erro ao executar a query.')
    }
  } catch (error) {
    console.error('Ocorreu um erro ao executar a query:', error)
    throw error
  }
}
