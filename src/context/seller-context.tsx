'use client'
import { getCookie, setCookie } from 'cookies-next'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { DataSellerInfo } from './models/sales'
import { SalesDataClient } from './models/sales-data-clients'
import { SaleByGroup } from './models/sales-data-groups'
import { Sellers } from './models/sellers'

interface SellerProviderProps {
  children: ReactNode
}

interface SellerContextType {
  info: DataSellerInfo[]
  loading: boolean
  sellers: Sellers[]
  clients: SalesDataClient[]
  client: SalesDataClient | undefined
  salesByGroup: SaleByGroup[]
  dateRange: { dateFrom: Date; dateTo: Date }
  fetchSalesByClients: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  fetchSalesByGroup: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  findClientById: (clientId: string) => void
  fetchSalesSeller: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  updateDateRange: (dateFrom: Date, dateTo: Date) => void
}

const SellerContext = createContext({} as SellerContextType)

export function SellerProvider({ children }: SellerProviderProps) {
  const [sellerInfo, setSellerInfo] = useState<DataSellerInfo[]>([])
  const [sellers, setSellers] = useState<Sellers[]>([])
  const [clients, setClients] = useState<SalesDataClient[]>([])
  const [salesByGroup, setSalesByGroup] = useState<SaleByGroup[]>([])
  const [client, setClient] = useState<SalesDataClient>()
  const [loading, setLoading] = useState<boolean>(true)
  const [dateRange, setDateRange] = useState<{ dateFrom: Date; dateTo: Date }>({
    dateFrom: new Date(),
    dateTo: new Date(),
  })

  const urlBaseApi = 'https://digitaltracer.ddns.com.br'
  // const urlBaseApi = 'http://localhost:5000'

  const fetchSaleSellerData = async (
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) => {
    setLoading(false)
    const result = await fetch(`${urlBaseApi}/v1/siac/sale-by-coordinates`, {
      method: 'POST',
      body: JSON.stringify({
        sellerId,
        dateFrom: dateFrom ? new Date(dateFrom) : new Date(),
        dateTo: dateTo ? new Date(dateTo) : new Date(),
        filter: 'amount',
      }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      next: { revalidate: 1800 },
    })

    const dataSellers = await result.json()
    setSellerInfo(dataSellers.results)
    setLoading(true)
  }

  const fetchSellers = async () => {
    setLoading(false)
    const result = await fetch(`${urlBaseApi}/v1/siac/sellers`, {
      cache: 'no-cache',
      // next: { revalidate: 1800 },
    })

    const dataSellers = await result.json()
    setSellers(dataSellers.sellers)
    setLoading(true)
  }

  const fetchClients = async (
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) => {
    setLoading(false)

    const result = await fetch(`${urlBaseApi}/v1/siac/sale-by-seller-clients`, {
      method: 'POST',
      body: JSON.stringify({
        sellerId,
        dateFrom: dateFrom ? new Date(dateFrom) : new Date(),
        dateTo: dateTo ? new Date(dateTo) : new Date(),
        filter: 'amount',
      }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      next: { revalidate: 1800 },
    })

    const dataClients = await result.json()

    setClients(dataClients.salesBySellerIdByClientId[0].clients)
    setLoading(true)
  }

  const fetchSales = async (dateFrom: Date, dateTo: Date, sellerId: string) => {
    setSalesByGroup([])
    setLoading(false)

    const result = await fetch(`${urlBaseApi}/v1/siac/sale-by-seller`, {
      method: 'POST',
      body: JSON.stringify({
        sellerId,
        dateFrom: dateFrom ? new Date(dateFrom) : new Date(),
        dateTo: dateTo ? new Date(dateTo) : new Date(),
        filter: 'amount',
      }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      next: { revalidate: 1800 },
    })

    const dataSales = await result.json()

    setSalesByGroup(dataSales.salesBySeller[0].groups)
    setLoading(true)
  }

  useEffect(() => {
    fetchSellers()

    // Retrieve date range from cookies
    const dateFromCookie = getCookie('dateFrom')
    const dateToCookie = getCookie('dateTo')
    console.log(dateFromCookie, dateToCookie)
    if (dateFromCookie && dateToCookie) {
      setDateRange({
        dateFrom: new Date(dateFromCookie as string),
        dateTo: new Date(dateToCookie as string),
      })
    }
  }, [])

  async function fetchSalesSeller(
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) {
    await fetchSaleSellerData(dateFrom, dateTo, sellerId)
  }

  async function fetchSalesByClients(
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) {
    await fetchClients(dateFrom, dateTo, sellerId)
  }

  async function fetchSalesByGroup(
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) {
    await fetchSales(dateFrom, dateTo, sellerId)
  }

  function findClientById(clientId: string) {
    setLoading(false)
    const client = clients.find((client) => client.clientId === clientId)
    setClient(client)
    setLoading(true)
  }

  function updateDateRange(dateFrom: Date, dateTo: Date) {
    setDateRange({ dateFrom, dateTo })

    // Set cookies
    setCookie('dateFrom', dateFrom.toISOString(), { path: '/' })
    setCookie('dateTo', dateTo.toISOString(), { path: '/' })

    console.log(dateRange)
  }

  return (
    <SellerContext.Provider
      value={{
        info: sellerInfo,
        fetchSalesSeller,
        fetchSalesByClients,
        fetchSalesByGroup,
        salesByGroup,
        findClientById,
        updateDateRange,
        dateRange,
        clients,
        client,
        loading,
        sellers,
      }}
    >
      {children}
    </SellerContext.Provider>
  )
}

export const useSeller = () => useContext(SellerContext)
