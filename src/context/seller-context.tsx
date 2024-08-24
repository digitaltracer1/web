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
import { InactiveClientReport } from './models/inactive-client-report'
import { Newclients } from './models/new-clients'

interface SellerProviderProps {
  children: ReactNode
}

interface SellerContextType {
  info: DataSellerInfo | undefined
  summarySeller: SummaryResult | undefined
  loading: { [key: string]: boolean }
  sellers: Sellers[]
  clients: ClientSummary[]
  newclients: Newclients[]
  client: ClientSummary | undefined
  clientsInactive: InactiveClientReport[]
  salesByGroup: SaleByGroup[]
  dateRange: { dateFrom: Date; dateTo: Date }
  goals: Goal | undefined
  fetchGoalsByGoalId: (goalId: string) => void
  fetchGoalsBySeller: (month: number, year: number, sellerId: string) => void
  fetchSalesByClients: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  fetchSalesByGroup: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  findClientById: (clientId: string) => void
  fetchClientsInactive: () => void
  fetchNewClients: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  fetchSalesSeller: (dateFrom: Date, dateTo: Date, sellerId: string) => void
  updateDateRange: (dateFrom: Date, dateTo: Date) => void
}

const SellerContext = createContext({} as SellerContextType)

export function SellerProvider({ children }: SellerProviderProps) {
  const [sellerInfo, setSellerInfo] = useState<DataSellerInfo>()
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

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  const [dateRange, setDateRange] = useState<{ dateFrom: Date; dateTo: Date }>({
    dateFrom: new Date(),
    dateTo: new Date(),
  })

  const urlBaseApi = process.env.NEXT_PUBLIC_API_URL

  const setLoadingState = (key: string, value: boolean) => {
    setLoading((prevState) => ({ ...prevState, [key]: value }))
  }

  const fetchSaleSellerData = async (
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) => {
    setLoadingState('fetchSaleSellerData', true)
    try {
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
      setSellerInfo(dataSellers[0])
    } finally {
      setLoadingState('fetchSaleSellerData', false)
    }
  }

  const fetchSellers = async () => {
    setLoadingState('fetchSellers', true)
    try {
      const result = await fetch(`${urlBaseApi}/v1/siac/sellers`, {
        cache: 'no-cache',
      })

      const dataSellers = await result.json()
      setSellers(dataSellers.sellers)
    } finally {
      setLoadingState('fetchSellers', false)
    }
  }

  const fetchClients = async (
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) => {
    setLoadingState('fetchClients', true)
    try {
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
    } finally {
      setLoadingState('fetchClients', false)
    }
  }

  const fetchSales = async (dateFrom: Date, dateTo: Date, sellerId: string) => {
    setLoadingState('fetchSales', true)
    try {
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
    } finally {
      setLoadingState('fetchSales', false)
    }
  }

  const fetchNewClients = async (
    dateFrom: Date,
    dateTo: Date,
    sellerId: string,
  ) => {
    setLoadingState('fetchNewClients', true)
    try {
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

      setNewclients(dataNewclient)
    } finally {
      setLoadingState('fetchNewClients', false)
    }
  }

  const fetchClientsInactive = async () => {
    setLoadingState('fetchClientsInactive', true)
    try {
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
    } finally {
      setLoadingState('fetchClientsInactive', false)
    }
  }

  const fetchGoalsByGoalId = async (goalId: string) => {
    setLoadingState('fetchGoalsByGoalId', true)
    try {
      const result = await fetch(`${urlBaseApi}/v1/goals/${goalId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      })

      const dataGoal = await result.json()

      const payload = {
        ...dataGoal,
        salesTarget: dataGoal.salesTarget
          ? {
              ...dataGoal.salesTarget,
              target: dataGoal.salesTarget.target * 100,
              bonus: dataGoal.salesTarget.bonus * 100,
            }
          : undefined,
        cancellationRate: dataGoal.cancellationRate
          ? {
              ...dataGoal.cancellationRate,
              target: dataGoal.cancellationRate.target,
              bonus: dataGoal.cancellationRate.bonus * 100,
            }
          : undefined,
        averageTicketTarget: dataGoal.averageTicketTarget
          ? {
              ...dataGoal.averageTicketTarget,
              target: dataGoal.averageTicketTarget.target * 100,
              bonus: dataGoal.averageTicketTarget.bonus * 100,
            }
          : undefined,
        inactiveClientsTarget: dataGoal.inactiveClientsTarget
          ? {
              ...dataGoal.inactiveClientsTarget,
              quantity: dataGoal.inactiveClientsTarget.quantity,
              minAmount: dataGoal.inactiveClientsTarget.minAmount * 100,
              bonus: dataGoal.inactiveClientsTarget.bonus * 100,
            }
          : undefined,
        newCustomersTarget: dataGoal.newCustomersTarget
          ? {
              ...dataGoal.newCustomersTarget,
              quantity: dataGoal.newCustomersTarget.quantity,
              minAmount: dataGoal.newCustomersTarget.minAmount * 100,
              bonus: dataGoal.newCustomersTarget.bonus * 100,
            }
          : undefined,
        specificClientTarget: dataGoal.specificClientTarget
          ? {
              ...dataGoal.specificClientTarget,
              amount: dataGoal.specificClientTarget.amount * 100,
              bonus: dataGoal.specificClientTarget.bonus * 100,
            }
          : undefined,
        brandTargets: dataGoal.brandTargets?.map(
          (brand: { target: number }) => ({
            ...brand,
            target: brand.target,
          }),
        ),
        bonusGoalBrand: dataGoal.bonusGoalBrand * 100,
      }

      setGoal(payload)
    } finally {
      setLoadingState('fetchGoalsByGoalId', false)
    }
  }

  const fetchGoalsBySeller = async (
    month: number,
    year: number,
    sellerId: string,
  ) => {
    setLoadingState('fetchGoalsBySeller', true)
    try {
      const result = await fetch(`${urlBaseApi}/v1/goals/find`, {
        method: 'POST',
        body: JSON.stringify({
          sellerId,
          month,
          year,
        }),
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      })

      const dataGoal = await result.json()
      if (dataGoal.ok === true) {
        setGoal(dataGoal.goal)
      } else if (dataGoal.ok === false) {
        setGoal(undefined)
      }
    } finally {
      setLoadingState('fetchGoalsBySeller', false)
    }
  }

  useEffect(() => {
    fetchSellers()

    // Retrieve date range from cookies
    const dateFromCookie = getCookie('dateFrom')
    const dateToCookie = getCookie('dateTo')
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
    setLoadingState('findClientById', true)
    const client = clients.find((client) => client.clientId === clientId)
    setClient(client)
    setLoadingState('findClientById', false)
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
        fetchGoalsByGoalId,
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
