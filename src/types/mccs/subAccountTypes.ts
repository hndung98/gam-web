export type SubAccount = {
  id: number
  name: string
  customer: string
  customerId: string
  email: string
  optimizationScore: number
  manager: string
  type: string
  clicks: number
  displays: number
  ctr: number
  cpc: number
  cost: number
  conversions: number
  conversionsCost: number
  conversionRate: number
  label: string
  createdAt: string
}

export type SubAccountType = {
  subAccountData: SubAccount[]
}
