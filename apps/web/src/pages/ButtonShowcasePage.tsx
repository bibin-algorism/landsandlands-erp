import AppLayout from '../components/layout/AppLayout'
import PageHeader from '../components/common/PageHeader'
import Button, { type ButtonVariant, type ButtonSize } from '../components/common/Button'

const VARIANTS: { key: ButtonVariant; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'dangerSoft', label: 'Danger soft' },
  { key: 'danger', label: 'Danger' },
  { key: 'ghost', label: 'Ghost' },
]

const SIZES: ButtonSize[] = ['medium', 'small']

const PlusIcon = ({ size }: { size: ButtonSize }) => (
  <svg
    className={size === 'medium' ? 'w-4 h-4' : 'w-[14px] h-[14px]'}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
)

export default function ButtonShowcasePage() {
  return (
    <AppLayout>
      <div className="space-y-8 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[{ label: 'Design System' }, { label: 'Button Showcase' }]}
          title="Button Component Showcase"
        />

        {SIZES.map((size) => (
          <div key={size} className="space-y-6">
            <h2 className="text-h3 font-serif font-bold text-primary border-b border-border-default pb-2 capitalize">
              Size: {size} ({size === 'medium' ? '42px height' : '34px height'})
            </h2>

            <div className="overflow-x-auto bg-surface-card border border-border-default rounded-2xl p-6 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-default text-caption font-bold text-secondary uppercase tracking-wider">
                    <th className="py-3 px-4">Variant</th>
                    <th className="py-3 px-4">Default</th>
                    <th className="py-3 px-4">Hover (Interactive)</th>
                    <th className="py-3 px-4">Focus (Simulated Ring)</th>
                    <th className="py-3 px-4">Disabled</th>
                    <th className="py-3 px-4">With Icon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default/60 text-body-small">
                  {VARIANTS.map(({ key: variant, label: variantLabel }) => (
                    <tr key={variant} className="hover:bg-bg-subtle/40 transition-colors">
                      <td className="py-4 px-4 font-semibold text-primary">{variantLabel}</td>

                      {/* Default state */}
                      <td className="py-4 px-4">
                        <Button variant={variant} size={size}>
                          Button
                        </Button>
                      </td>

                      {/* Hover state */}
                      <td className="py-4 px-4">
                        <Button variant={variant} size={size} className="hover">
                          Hover Me
                        </Button>
                      </td>

                      {/* Focus state */}
                      <td className="py-4 px-4">
                        <Button variant={variant} size={size} isFocusedState={true}>
                          Focus Ring
                        </Button>
                      </td>

                      {/* Disabled state */}
                      <td className="py-4 px-4">
                        <Button variant={variant} size={size} disabled={true}>
                          Disabled
                        </Button>
                      </td>

                      {/* With Icon state */}
                      <td className="py-4 px-4">
                        <Button variant={variant} size={size} icon={<PlusIcon size={size} />}>
                          Add Item
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
