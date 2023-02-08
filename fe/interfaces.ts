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
    search: TransactionFilterFieldSearch
    bank: string
    account: string
    startDate?: Date
    endDate?: Date
    sort: string
}

export interface TransactionFilterFieldSearch {
    string: string,
    filteredAccounts: string[]
    filteredBanks: string[]
    filteredCategories: string[]
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
