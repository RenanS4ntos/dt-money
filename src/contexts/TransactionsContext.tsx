import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

interface TransactionsContextProps {
  children: ReactNode
}

interface TransactionsProps {
  id: number
  descriptions: string
  category: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
}

interface TransactionsContextType {
  transactions: TransactionsProps[]
  fetchTransactions: (query?: string) => Promise<void>
}

const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transaction', {
      params: {
        q: query,
      },
    })

    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
