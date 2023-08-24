import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

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
}

const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data: TransactionsProps[] = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
