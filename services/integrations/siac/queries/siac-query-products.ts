import siac from '../../../axios/axios-siac.config'

const fetchQueryData = async () => {
  const query = `
  SELECT PRODUTO.CODPRO, PRODUTO.NUM_FAB, PRODUTO.ESTOQUE01, PRODUTO.ESTOQUE06, PRODUTO.UNIDADE, PRODUTO.NACIONAL, PRODUTO.PRODUTO,
    P_PRECOS.P_CUSTO, SECAO.CODSEC, SECAO.SECAO, GRUPO.CODGRU, GRUPO.GRUPO,
    PRODUTO.NUM_ORIG, PRODUTO.BARRAEAN, PRODUTO.CLASSEFISC, PRODUTO.CEST, P_PRECOS.P_VENDA 
  FROM ((PRODUTO 
    INNER JOIN P_PRECOS ON PRODUTO.CODPRO = P_PRECOS.CODPRO) 
    INNER JOIN SECAO ON PRODUTO.CODSEC = SECAO.CODSEC) 
    INNER JOIN GRUPO ON PRODUTO.CODGRU = GRUPO.CODGRU 
  WHERE 
    P_PRECOS.CATEGORIA = 'A' 
    AND SECAO.SECAO <> 'SERVICOS' 
  ORDER BY PRODUTO.CODPRO DESC
  LIMIT 10;
`

  try {
    const rawQuery = query.replace(/\s+/g, ' ').trim()

    const response = await siac.post('query', {
      sql: rawQuery,
    })

    // Verifica se a resposta foi bem-sucedida e retorna os dados, se houver
    if (response.status === 200) {
      return response.data // Retorna os dados da query
    } else {
      throw new Error('Erro ao executar a query.')
    }
  } catch (error) {
    console.error('Ocorreu um erro ao executar a query:', error)
    throw error
  }
}

export default fetchQueryData
