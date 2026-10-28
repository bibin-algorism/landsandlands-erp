export function inputClass(error?: string): string {
  return `w-full px-3.5 py-2.5 bg-bg-default border rounded-xl text-body-small text-primary placeholder:text-disabled outline-none transition-colors ${
    error ? 'border-error focus:border-error' : 'border-border-default focus:border-border-strong'
  }`
}
