'use client'
import { getCookie, setCookie } from 'cookies-next'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { DataSellerInfo, SummaryResult } from './models/sales'
import { ClientSummary } from './models/sales-data-clients'
import { SaleByGroup } from './models/sales-data-groups'
import { Sellers } from './models/sellers'
import { Goal } from './models/goals'

interface InactiveClientReport {
  clientId: string
  clientName: string
  businessName: string
  createdAt: Date
  lastPurchaseDate: Date | null
  state: string
  areaCode: string
  phoneNumber: string
  lastPurchase: string
}

export interface Newclients {
  clientId: string
  clientName: string
  businessName: string
  state: string
  areaCode: string
  phoneNumber: string
  createdAt: Date
  firstPurchase: Date
  store: string
  invoiceNumber: string
  series: string
  sellerId: string
}

interface SellerProviderProps {
  children: ReactNode
}

interface SellerContextType {
  info: DataSellerInfo[]
  summarySeller: SummaryResult | undefined
  loading: boolean
  sellers: Sellers[]
  clients: ClientSummary[]
  newclients: Newclients[]
  client: ClientSummary | undefined
  clientsInactive: InactiveClientReport[]
  salesByGroup: SaleByGroup[]
  dateRange: { dateFrom: Date; dateTo: Date }
  goals: Goal | undefined
  fetchGoalsBySeller: (goalId: string) => void
  fetchSalesByClients: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  fetchSalesByGroup: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  findClientById: (clientId: string) => void
  fetchClientsInactive: (clientId: string) => void
  fetchNewClients: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  fetchSalesSeller: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  updateDateRange: (dateFrom: Date, dateTo: Date) => void
}

const SellerContext = createContext({} as SellerContextType)

export function SellerProvider({ children }: SellerProviderProps) {
  const [sellerInfo, setSellerInfo] = useState<DataSellerInfo[]>([])
  const [summary, setSummary] = useState<SummaryResult>()
  const [goal, setGoal] = useState<Goal>()
  const [sellers, setSellers] = useState<Sellers[]>([])
  const [clients, setClients] = useState<ClientSummary[]>([])
  const [client, setClient] = useState<ClientSummary>()
  const [newclients, setNewclients] = useState<Newclients[]>([])
  const [clientsInactive, setClientInactive] = useState<InactiveClientReport[]>(
    [],
  )
  const [salesByGroup, setSalesByGroup] = useState<SaleByGroup[]>([])
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

    const [result, summaryResult] = await Promise.all([
      fetch(`${urlBaseApi}/v1/siac/sale-by-coordinates`, {
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
      }),
      fetch(`${urlBaseApi}/v1/siac/sales-summary`, {
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
      }),
    ])

    const dataSellers = await result.json()
    const summary = await summaryResult.json()

    setSummary(summary)
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

    const result = await fetch(`${urlBaseApi}/v1/siac/sales-by-clients`, {
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

    setClients(dataClients)
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

  const fetchNewClients = async (
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) => {
    setLoading(false)

    const result = await fetch(
      `${urlBaseApi}/v1/siac/new-clients-by-sellerId`,
      {
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
      },
    )

    const dataNewclient = await result.json()
    console.log(dataNewclient)

    setNewclients(dataNewclient)
    setLoading(true)
  }

  const fetchClientsInactive = async () => {
    setLoading(false)

    const dateFrom = new Date()
    dateFrom.setMonth(dateFrom.getMonth() - 2)

    const dateTo = new Date()
    dateTo.setMonth(dateTo.getMonth() + 6)

    const result = await fetch(`${urlBaseApi}/v1/siac/clients-inactive`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      next: { revalidate: 1800 },
    })

    const clientsInactive = await result.json()

    setClientInactive(clientsInactive)
    setLoading(true)
  }

  const fetchGoalsBySeller = async (goalId: string) => {
    setLoading(false)

    const result = await fetch(`${urlBaseApi}/v1/goals/${goalId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      next: { revalidate: 1800 },
    })

    const dataGoal = await result.json()
    console.log(dataGoal)
    setGoal(dataGoal)
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
  }

  return (
    <SellerContext.Provider
      value={{
        info: sellerInfo,
        summarySeller: summary,
        goals: goal,
        fetchGoalsBySeller,
        fetchSalesSeller,
        fetchSalesByClients,
        fetchSalesByGroup,
        fetchClientsInactive,
        fetchNewClients,
        salesByGroup,
        findClientById,
        updateDateRange,
        dateRange,
        clients,
        newclients,
        client,
        clientsInactive,
        loading,
        sellers,
      }}
    >
      {children}
    </SellerContext.Provider>
  )
}

export const useSeller = () => useContext(SellerContext)
