import { useState } from 'react'
import { countryRates, STORAGE_KEY } from '../../constants'
import { hexToRgb } from '../../utils/color'

type FormState = {
  receiverName: string
  weight: number | ''
  colour: string
  destination: string
}

const INITIAL_FORM: FormState = {
  receiverName: '',
  weight: '',
  colour: '#ffffff',
  destination: 'Sweden',
}

export default function useBoxForm() {
  const [form, setForm] = useState<FormState>({ ...INITIAL_FORM })
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const validate = () => {
    if (!form.receiverName.trim()) return 'Receiver name is required.'
    if (form.weight === '' || form.weight === null) return 'Weight is required.'
    if (typeof form.weight === 'number' && form.weight < 0) return 'Negative weights are not allowed.'
    if (!form.destination) return 'Destination is required.'
    return null
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {

  
    const validationError = validate()
    if (validationError) { 
      setError(validationError)
      return false
    }

    setStatus(null)
    setError(null)
   
    try {
      const rgb = hexToRgb(form.colour)
      const rate = countryRates[form.destination] ?? 0
      const payload = {
        receiverName: form.receiverName.trim(),
        weight: typeof form.weight === 'number' ? form.weight : 0,
        boxColour: rgb,
        destination: form.destination,
        rate,
      }

      const rawJson = localStorage.getItem(STORAGE_KEY) || '[]'
      const storedList = JSON.parse(rawJson)
      const record = { id: Date.now(), ...payload }
      storedList.push(record)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedList))

      setStatus('Saved successfully')
      setForm({ ...INITIAL_FORM })
      return true
    } catch (err) {
      setError('Could not save data to localStorage.')
      return false
    }
  }

  return {
    form,
    setField,
    error,
    status,
    handleSubmit,
    hexToRgb,
    countryRates,
  }
}
