'use client'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface SellerProviderProps {
  children: ReactNode
}

interface ClinentInfo {
  clientId: string
  clientName: string
  address: string
  postal_code: string
  neighborhood: string
  businessName: string
  geojson?: {
    name: string
    lat: number
    lng: number
  }
}
interface SummaryResult {
  sellerId: string
  soldAmount: number
  valueSold: number
  canceledAmount: number
  valueCanceled: number
  devolutionAmount: number
  valueDevolution: number
}

export interface DataSellerInfo {
  sellerId: string
  sellerName: string
  summary?: SummaryResult
  sales: {
    productId: string
    productName: string
    valueSold: number
    soldAmount: number
    clientInfo: ClinentInfo
  }[]
}

interface SellerInfo {
  sellers: {
    id: string
    name: string
    birthdate: string
  }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSale: DataSellerInfo[]
}

interface SellerContextType {
  info: SellerInfo | undefined
  updateSellers: (date: string) => void
}

const SellerContext = createContext({} as SellerContextType)

export function SellerProvider({ children }: SellerProviderProps) {
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>()

  // Função para buscar dados do vendedor
  const fetchSellerInfo = async ({ date }: { date?: string } = {}) => {
    try {
      const [sellers, dataSale] = await Promise.all([
        fetch('https://digitaltracer.ddns.com.br/v1/siac/sellers', {
          cache: 'force-cache',
          next: { revalidate: 1800 },
        }),
        fetch('https://digitaltracer.ddns.com.br/v1/siac/sale-by-coordinates', {
          method: 'POST',
          body: JSON.stringify({
            sellerId: '0036',
            date: date ? new Date(date) : new Date(),
            filter: 'amount',
          }),
          headers: { 'Content-Type': 'application/json' },
          cache: 'force-cache',
          next: { revalidate: 1800 },
        }),
      ])

      const dataSellers = await sellers.json()
      const dataSales = await dataSale.json()
      const now = new Date().getTime()

      localStorage.setItem(
        'sellerInfo',
        JSON.stringify({
          sellers: dataSellers.sellers,
          dataSale: dataSales.results,
          timestamp: now,
        }),
      )

      setSellerInfo({
        sellers: dataSellers.sellers,
        dataSale: dataSales.results,
      })
    } catch (error) {
      console.error('Falha ao buscar informações do vendedor:', error)
    }
  }

  // Efeito para buscar os dados do vendedor ao montar o componente
  useEffect(() => {
    const sellerInfoString = localStorage.getItem('sellerInfo')
    const sellerInfo = sellerInfoString ? JSON.parse(sellerInfoString) : {}

    const oneHour = 60 * 60 * 1000
    const now = new Date().getTime()

    if (!sellerInfo.timestamp || now - sellerInfo.timestamp > oneHour) {
      fetchSellerInfo()
    } else {
      const data = {
        sellers: sellerInfo.sellers,
        dataSale: sellerInfo.dataSale,
      }
      setSellerInfo(data)
    }
  }, [])

  async function updateSellers(date: string) {
    fetchSellerInfo({ date })
  }

  return (
    <SellerContext.Provider value={{ info: sellerInfo, updateSellers }}>
      {children}
    </SellerContext.Provider>
  )
}

export const useSeller = () => useContext(SellerContext)
