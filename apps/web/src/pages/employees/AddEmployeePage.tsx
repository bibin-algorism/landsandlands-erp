import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import { useCreateEmployee, useEmployees } from '../../hooks/useEmployees'
import type { CreateEmployeeResponse } from '../../api/types'

import Step1Personal from '../../components/employees/Step1Personal'
import Step2Communication from '../../components/employees/Step2Communication'
import Step3Documents from '../../components/employees/Step3Documents'
import Step4Employment from '../../components/employees/Step4Employment'
import Step5Financial from '../../components/employees/Step5Financial'
import Step6Review from '../../components/employees/Step6Review'
import Step7Success from '../../components/employees/Step7Success'
import WizardStepBar from '../../components/employees/WizardStepBar'
import EmployeeSideCard from '../../components/employees/EmployeeSideCard'
import {
  INITIAL_FORM_DATA,
  buildCreatePayload,
  type EmployeeFormData,
} from '../../components/employees/employeeForm'

const WIZARD_STEPS = [
  { step: 1, label: 'Personal' },
  { step: 2, label: 'Communication' },
  { step: 3, label: 'Documents' },
  { step: 4, label: 'Employment' },
  { step: 5, label: 'Financial' },
  { step: 6, label: 'Review' },
]

export default function AddEmployeePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [furthestStep, setFurthestStep] = useState(1)
  const [formData, setFormData] = useState<EmployeeFormData>(INITIAL_FORM_DATA)
  const [createdResponse, setCreatedResponse] = useState<CreateEmployeeResponse | null>(null)
  const [isSignInSetUp, setIsSignInSetUp] = useState(false)

  const { createEmployeeAsync, isPending, error } = useCreateEmployee()
  const { data: employees } = useEmployees()
  const manager = employees?.find((emp) => emp.id === formData.reportingAuthorityId)
  const managerName = manager ? `${manager.firstName} ${manager.lastName}` : undefined

  // Documents merge per key so uploads that finish after other edits are not lost.
  const updateFormData = (fields: Partial<EmployeeFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
      documents: fields.documents ? { ...prev.documents, ...fields.documents } : prev.documents,
    }))
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
    setFurthestStep((prev) => Math.max(prev, step))
  }

  const handleSubmitFinal = async () => {
    try {
      const res = await createEmployeeAsync(buildCreatePayload(formData))
      setCreatedResponse(res)
      setCurrentStep(7)
    } catch {
      // Error handled by hook state
    }
  }

  const handleResetWizard = () => {
    setFormData(INITIAL_FORM_DATA)
    setCreatedResponse(null)
    setIsSignInSetUp(false)
    setCurrentStep(1)
    setFurthestStep(1)
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/employees' },
            { label: 'Employees', path: '/employees' },
            { label: 'Add Employee' },
          ]}
          title="Add Employee"
          actions={
            currentStep < 7 && (
              <button
                type="button"
                onClick={() => navigate('/employees')}
                className="px-4 py-2 text-body-small font-medium text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )
          }
        />

        {currentStep < 7 && (
          <WizardStepBar
            steps={WIZARD_STEPS}
            currentStep={currentStep}
            onStepClick={(step) => {
              if (step <= furthestStep) setCurrentStep(step)
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            {currentStep === 1 && (
              <Step1Personal formData={formData} updateFormData={updateFormData} onNext={() => goToStep(2)} />
            )}

            {currentStep === 2 && (
              <Step2Communication
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => goToStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <Step3Documents
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => goToStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <Step4Employment
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => goToStep(5)}
                onBack={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 5 && (
              <Step5Financial
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => goToStep(6)}
                onBack={() => setCurrentStep(4)}
              />
            )}

            {currentStep === 6 && (
              <Step6Review
                formData={formData}
                managerName={managerName}
                onSubmit={handleSubmitFinal}
                onBack={() => setCurrentStep(5)}
                onEditStep={(step) => setCurrentStep(step)}
                isSubmitting={isPending}
                error={error}
              />
            )}

            {currentStep === 7 && createdResponse && (
              <Step7Success
                createdData={createdResponse}
                formData={formData}
                managerName={managerName}
                onResetWizard={handleResetWizard}
                onSignInSetUpChange={(isSetUp) => setIsSignInSetUp(isSetUp)}
              />
            )}
          </div>

          <EmployeeSideCard
            currentStep={currentStep}
            formData={formData}
            managerName={managerName}
            createdResponse={createdResponse}
            isSignInSetUp={isSignInSetUp}
          />
        </div>
      </div>
    </AppLayout>
  )
}
