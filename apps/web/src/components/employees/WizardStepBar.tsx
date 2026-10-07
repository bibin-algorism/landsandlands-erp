import checkIconBrandAccent from '../../assets/icons/check-icon-brand-accent.svg'

export interface WizardStep {
  step: number
  label: string
}

export interface WizardStepBarProps {
  steps: WizardStep[]
  currentStep: number
  onStepClick: (step: number) => void
}

export default function WizardStepBar({
  steps,
  currentStep,
  onStepClick,
}: WizardStepBarProps) {
  if (currentStep > 7) return null

  return (
    <div className="bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-full px-6 py-3.5 shadow-xs">
      <div className="flex items-center justify-between overflow-x-auto gap-1">
        {steps.map((s) => {
          const isDone = currentStep > s.step
          const isCurrent = currentStep === s.step

          return (
            <div key={s.step} className="flex items-center flex-1 min-w-0 last:flex-none">
              <button
                type="button"
                onClick={() => onStepClick(s.step)}
                className="flex items-center gap-3 transition-colors shrink-0 text-left cursor-pointer"
              >
                {/* Step Circle */}
                <div
                  className={`w-7 h-7 rounded-full text-caption font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isDone
                      ? 'bg-[#18181B] text-[#FACC15]'
                      : 'bg-[#FACC15] text-[#18181B] shadow-xs'
                  }`}
                >
                  {isDone ? (
                    <img
                      src={checkIconBrandAccent}
                      alt="Completed"
                      className="w-3 h-2.5"
                    />
                  ) : (
                    s.step
                  )}
                </div>

                {/* Step Text Stack */}
                <div className="flex flex-col">
                  <span className="text-[11px] text-secondary font-medium leading-none mb-1">
                    Step {s.step}
                  </span>
                  <span
                    className={`text-caption font-bold leading-none ${
                      isCurrent
                        ? 'text-primary'
                        : isDone
                        ? 'text-primary font-semibold'
                        : 'text-secondary font-medium'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
