export interface Transaction {
  id: string
  accountId: string
  categoryId: string
  reference: string
  amount: number
  currency: 'EUR' | 'GBP'
  date: Date
}

export interface TransactionFilterFields {
    search?: String
    bank?: String
    account?: String
    startDate?: Date
    endDate?: Date
    sort?: 'desc' | 'asc'
}

export interface Category {
    id: string
    name: string
    color: string
}

export interface Account {
    id: string
    name: string
    bank: string
}

export interface Bank {
    bank: string
}
