import { useState } from 'react'
import { validateStep, type EmployeeFormData, type FormErrors } from './employeeForm'

/**
 * Validates a wizard step on Continue. Errors show only after the first attempt,
 * then update live as HR corrects the fields.
 */
export function useStepValidation(step: number, formData: EmployeeFormData, onNext: () => void) {
  const [attempted, setAttempted] = useState(false)
  const errors: FormErrors = attempted ? validateStep(step, formData) : {}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (Object.keys(validateStep(step, formData)).length === 0) onNext()
  }

  return { errors, handleSubmit }
}
