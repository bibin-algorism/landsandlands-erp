import type { ReactNode } from 'react'
import type { EmployeeSection } from './employeeSections'

const ORDER: EmployeeSection[] = ['Personal', 'Communication', 'Documents', 'Employment', 'Financial', 'System data']

/** "Show:" pills (BRQ-06): exactly one section is open at a time. */
export default function SectionPills({
  active,
  onSelect,
  available,
  disabled = [],
  note,
}: {
  active: EmployeeSection
  onSelect: (section: EmployeeSection) => void
  available: EmployeeSection[]
  disabled?: EmployeeSection[]
  note?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-caption text-secondary mr-1">Show:</span>
        {ORDER.filter((s) => available.includes(s)).map((section) => {
          const isOn = active === section
          const isDisabled = disabled.includes(section)
          return (
            <button
              key={section}
              type="button"
              disabled={isDisabled}
              aria-pressed={isOn}
              onClick={() => onSelect(section)}
              className={`px-4 py-1.5 rounded-full text-caption font-semibold transition-all ${
                isDisabled
                  ? 'bg-bg-subtle text-disabled cursor-not-allowed'
                  : isOn
                    ? 'bg-[#18181B] text-white cursor-pointer'
                    : 'bg-white text-secondary border border-border-default hover:text-primary cursor-pointer'
              }`}
            >
              {section}
            </button>
          )
        })}
      </div>
      {note && <div className="text-caption text-secondary flex items-center gap-1.5">{note}</div>}
    </div>
  )
}
