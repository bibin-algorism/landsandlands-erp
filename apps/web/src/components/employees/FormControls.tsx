import type { ReactNode } from 'react'
import { inputClass } from './formStyles'

export function Field({
  label,
  htmlFor,
  required = true,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-caption font-semibold text-secondary">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-[11px] font-medium text-error">{error}</p>
      ) : hint ? (
        <p className="text-[11px] text-secondary">{hint}</p>
      ) : null}
    </div>
  )
}

export function SelectInput({
  id,
  value,
  onChange,
  placeholder,
  options,
  error,
}: {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: readonly (string | { value: string; label: string })[]
  error?: string
}) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass(error)}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => {
        const { value: optValue, label } = typeof opt === 'string' ? { value: opt, label: opt } : opt
        return (
          <option key={optValue} value={optValue}>
            {label}
          </option>
        )
      })}
    </select>
  )
}

export function ChoicePills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T | ''
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer ${
            value === opt.value
              ? 'bg-[#18181B] text-white shadow-xs'
              : 'bg-white border border-[#D4D4D8] text-secondary hover:text-primary'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function SectionTitle({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <h3
      className={`text-[11px] font-bold tracking-wider uppercase text-secondary ${
        first ? '' : 'pt-4 border-t border-border-default/50'
      }`}
    >
      {children}
    </h3>
  )
}

export function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-h2 font-serif font-bold text-primary">{title}</h2>
      <p className="text-caption text-secondary font-medium">{subtitle}</p>
    </div>
  )
}

export function StepActions({ onBack, nextLabel }: { onBack?: () => void; nextLabel: string }) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-border-default">
      <button
        type="button"
        onClick={onBack}
        disabled={!onBack}
        className="px-5 py-2 bg-white border border-border-default rounded-xl text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        type="submit"
        className="px-6 py-2.5 bg-brand-accent text-primary text-caption font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
      >
        {nextLabel}
      </button>
    </div>
  )
}
