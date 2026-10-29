import type { ReactNode } from 'react'
import type { EmployeeView } from '../../api/types'
import { BACKGROUND_LABELS, QUALIFICATION_LABELS } from '../../constants/employee'
import { formatDate } from './employeeForm'

/** Right-hand Documents card on the employee details and edit pages. */
export default function DocumentsPanel({
  employee,
  onOpen,
  children,
}: {
  employee: EmployeeView
  onOpen: (document: string) => void
  /** Extra content, e.g. the education editor on the edit page. */
  children?: ReactNode
}) {
  const documentation = employee.documentation
  const documents = documentation?.documents ?? []

  return (
    <div className="bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-h4 font-serif font-bold text-primary">Documents</h3>
        <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-caption font-semibold">
          {documents.length} uploaded
        </span>
      </div>

      {documentation && (
        <div className="text-caption text-secondary space-y-0.5">
          <div>
            Highest qualification:{' '}
            <span className="text-primary font-semibold">{QUALIFICATION_LABELS[documentation.highestQualification]}</span>
          </div>
          {documentation.employeeBackground && (
            <div>
              Background:{' '}
              <span className="text-primary font-semibold">{BACKGROUND_LABELS[documentation.employeeBackground]}</span>
            </div>
          )}
          {documentation.isIncomplete && (
            <div className="text-[#B45309] font-semibold">
              Previous-organisation document due {formatDate(documentation.secondDocDueDate)}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {documents.map((doc) => (
          <div
            key={doc.document}
            className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 flex flex-col items-center text-center gap-2"
          >
            <span className="w-8 h-8 rounded-full bg-[#047857] text-white flex items-center justify-center text-caption font-bold">
              ✓
            </span>
            <span className="text-caption font-semibold text-primary">{doc.label}</span>
            <button
              type="button"
              onClick={() => onOpen(doc.document)}
              className="text-caption text-[#047857] font-semibold underline cursor-pointer"
            >
              View
            </button>
          </div>
        ))}
        {documents.length === 0 && <p className="text-caption text-secondary col-span-2">No documents.</p>}
      </div>

      {children}
    </div>
  )
}
