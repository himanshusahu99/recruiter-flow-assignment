import { useCallback, useEffect, useState } from 'react'
import { STORAGE_KEY } from '../../constants'

export type BoxRecord = {
  id?: string | number
  receiverName: string
  weight: number
  boxColour: string
  destination: string
  rate: number
}

 

export default function useBoxes() {
  const [items, setItems] = useState<BoxRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    try {
      const rawJson = localStorage.getItem(STORAGE_KEY) || '[]'
      const parsed = JSON.parse(rawJson)
      if (Array.isArray(parsed)) setItems(parsed)
      else setItems([])
    } catch (err) {
      setError('Unable to load list')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const calculateCost = (box: BoxRecord) => {
    const weightValue = typeof box.weight === 'number' ? box.weight : 0
    return (box.rate ?? 0) * weightValue
  }

  return {
    items,
    loading,
    error,
    calculateCost,
  }
}
