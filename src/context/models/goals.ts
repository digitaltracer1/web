export interface SalesTarget {
  // id: string
  target: number
  // achieved: number
  bonus: number
  // createdAt?: string
  // updatedAt?: string
  // goalId: string
}

export interface CancellationRate {
  // id: string
  target: number
  rate: number
  bonus: number
  // createdAt?: string
  // updatedAt?: string
  // goalId: string
}

export interface AverageTicketTarget {
  // id: string
  target: number
  // achieved: number
  bonus: number
  // createdAt?: string
  // updatedAt?: string
  // goalId: string
}

export interface InactiveClientsTarget {
  // id: string
  quantity: number
  rescued: number
  minAmount: number
  bonus: number
  // createdAt?: string
  // updatedAt?: string
  // goalId: string
}

export interface NewCustomersTarget {
  // id: string
  quantity: number
  // achieved: number
  minAmount: number
  bonus: number
  // createdAt?: string
  // updatedAt?: string
  // goalId: string
}

export interface SpecificClientTarget {
  // id: string
  clientId: string
  clientName: string
  amount: number
  bonus: number
  // createdAt?: string
  // updatedAt?: string
  // goalId: string
}

export interface BrandTarget {
  // id: string
  brandId: string
  brandName: string
  target: number
  // achieved: number
  // createdAt?: string
  // updatedAt?: string
  // goalId: string
}

export interface Goal {
  id: string
  year: number
  month: number
  bonusGoalBrand: number
  sellerId: string
  createdAt?: string
  updatedAt?: string
  salesTarget?: SalesTarget
  cancellationRate?: CancellationRate
  averageTicketTarget?: AverageTicketTarget
  inactiveClientsTarget?: InactiveClientsTarget
  newCustomersTarget?: NewCustomersTarget
  specificClientTarget?: SpecificClientTarget
  brandTargets?: BrandTarget[]
}

export interface GoalFieldMap {
  salesTarget: keyof SalesTarget
  cancellationRate: keyof CancellationRate
  averageTicketTarget: keyof AverageTicketTarget
  inactiveClientsTarget: keyof InactiveClientsTarget
  newCustomersTarget: keyof NewCustomersTarget
  specificClientTarget: keyof SpecificClientTarget
  brandTargets: keyof BrandTarget
}

export const GoalStartValue: Goal = {
  id: '',
  year: 0,
  month: 0,
  bonusGoalBrand: 0,
  sellerId: '',
  salesTarget: {
    target: 0,
    bonus: 0,
  },
  cancellationRate: {
    target: 0,
    rate: 0,
    bonus: 0,
  },
  averageTicketTarget: {
    target: 0,
    bonus: 0,
  },
  inactiveClientsTarget: {
    quantity: 0,
    rescued: 0,
    minAmount: 0,
    bonus: 0,
  },
  newCustomersTarget: {
    quantity: 0,
    minAmount: 0,
    bonus: 0,
  },
  specificClientTarget: {
    clientId: '',
    clientName: '',
    amount: 0,
    bonus: 0,
  },
  brandTargets: [],
}
