import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import { useCreateEmployee } from '../../hooks/useEmployees'
import type { CreateEmployeePayload, CreateEmployeeResponse } from '../../api/types'

import Step1Personal from '../../components/employees/Step1Personal'
import Step2Communication from '../../components/employees/Step2Communication'
import Step3Documents from '../../components/employees/Step3Documents'
import Step4Employment from '../../components/employees/Step4Employment'
import Step5Financial from '../../components/employees/Step5Financial'
import Step6Review from '../../components/employees/Step6Review'
import Step7Success from '../../components/employees/Step7Success'
import WizardStepBar from '../../components/employees/WizardStepBar'
import EmployeeSideCard from '../../components/employees/EmployeeSideCard'

const INITIAL_FORM_DATA: CreateEmployeePayload = {
  // Step 1
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
  maritalStatus: '',
  fatherName: '',
  aadhaarNumber: '',
  panNumber: '',
  drivingLicenceNumber: '',

  // Step 2
  personalPhone: '',
  secondaryPhone: '',
  officialPhone: '',
  personalEmail: '',
  officialEmail: '',
  currentAddress: '',
  permanentAddress: '',
  emergencyContacts: [],

  // Step 3
  highestQualification: '',
  previousOrgDocStatus: '',
  employeeBackground: '',
  documentFiles: {},

  // Step 4
  vertical: '',
  role: '',
  jobType: '',
  joiningDate: '',
  probationPeriod: '',
  financialAgreement: '',

  // Step 5
  accountHolderName: '',
  accountNumber: '',
  ifscCode: '',
  branchName: '',
  takeHomePayTotal: 0,
  nextAppraisalWindow: '',
}

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
  const [formData, setFormData] = useState<CreateEmployeePayload>(INITIAL_FORM_DATA)
  const [createdResponse, setCreatedResponse] = useState<CreateEmployeeResponse | null>(null)
  const [isSignInSetUp, setIsSignInSetUp] = useState(false)

  const { createEmployeeAsync, isPending, error } = useCreateEmployee()

  const updateFormData = (fields: Partial<CreateEmployeePayload>) => {
    setFormData((prev) => {
      if (fields.documentFiles) {
        return {
          ...prev,
          ...fields,
          documentFiles: {
            ...(prev.documentFiles || {}),
            ...fields.documentFiles,
          },
        }
      }
      return { ...prev, ...fields }
    })
  }

  const handleSubmitFinal = async () => {
    try {
      const payload: CreateEmployeePayload = {
        ...formData,
        initialPassword: formData.initialPassword || 'Lands@2026!Temp',
      }
      const res = await createEmployeeAsync(payload)
      setCreatedResponse(res)
      setCurrentStep(7)
    } catch {
      // Error handled by hook state
    }
  }

  const handleResetWizard = () => {
    setFormData(INITIAL_FORM_DATA)
    setCreatedResponse(null)
    setCurrentStep(1)
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'New Employee'

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        {/* Top Header Row */}
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/employees' },
            { label: 'Employees', path: '/employees' },
            { label: 'Add Employee' },
          ]}
          title="Add Employee"
          actions={
            <>
              <button
                type="button"
                onClick={() => navigate('/employees')}
                className="px-4 py-2 text-body-small font-medium text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-white border border-border-default rounded-xl text-body-small font-medium text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
              >
                Save draft
              </button>
            </>
          }
        />

        {/* Dev Step Switcher Toolbar (Temporary for development) */}
        {/* <div className="flex items-center gap-2 p-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-caption font-semibold text-secondary overflow-x-auto">
          <span className="text-[11px] uppercase tracking-wider text-secondary px-2 font-bold shrink-0">
            Dev Nav:
          </span>
          {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
            <button
              key={stepNum}
              type="button"
              onClick={() => setCurrentStep(stepNum)}
              className={`px-3 py-1 rounded-lg text-caption font-bold transition-all cursor-pointer shrink-0 ${
                currentStep === stepNum
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-secondary hover:text-primary border border-border-default hover:bg-bg-subtle'
              }`}
            >
              {stepNum === 7 ? 'Step 7 (Success)' : `Step ${stepNum}`}
            </button>
          ))}
        </div> */}

        {/* Wizard Steps Bar Component */}
        <WizardStepBar
          steps={WIZARD_STEPS}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* 2-Column Form & Summary Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Main Step Form - 8 cols) */}
          <div className="lg:col-span-8 bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            {currentStep === 1 && (
              <Step1Personal
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <Step2Communication
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <Step3Documents
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <Step4Employment
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => setCurrentStep(5)}
                onBack={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 5 && (
              <Step5Financial
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => setCurrentStep(6)}
                onBack={() => setCurrentStep(4)}
              />
            )}

            {currentStep === 6 && (
              <Step6Review
                formData={formData}
                onSubmit={handleSubmitFinal}
                onBack={() => setCurrentStep(5)}
                onEditStep={(step) => setCurrentStep(step)}
                isSubmitting={isPending}
                error={error}
              />
            )}

            {currentStep === 7 && (
              <Step7Success
                createdData={createdResponse}
                formData={formData}
                employeeName={fullName}
                onResetWizard={handleResetWizard}
                onSignInSetUpChange={(isSetUp) => setIsSignInSetUp(isSetUp)}
              />
            )}
          </div>

          {/* Right Column (Side Card Component - 4 cols) */}
          <EmployeeSideCard
            currentStep={currentStep}
            formData={formData}
            createdResponse={createdResponse}
            isSignInSetUp={isSignInSetUp}
          />
        </div>
      </div>
    </AppLayout>
  )
}
