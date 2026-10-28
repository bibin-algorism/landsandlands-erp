import type { EditableField } from '../../../api/types'
import type { UploadedDoc } from '../employeeForm'
import { DocumentCard } from '../Step3Documents'
import FieldEditor from './FieldEditor'
import FieldValue from './FieldValue'
import { GROUP_LABELS, GROUP_ORDER, initialEditorValue } from './fieldEditing'

export interface FieldChangeListProps {
  fields: EditableField[]
  /** Fields being changed → editor value. */
  drafts: Record<string, unknown>
  onDraftChange: (key: string, value: unknown | undefined) => void
  employeeId: string
  onOpenCurrentFile?: (key: string) => void
  /** Change-request mode: proof uploads per field (FR-17). */
  proofs?: Record<string, UploadedDoc>
  onProofSelect?: (key: string, file: File) => void
  errors?: Record<string, string>
}

/**
 * Catalogue fields grouped as in the BRD (BRQ-06). Each shows its current value and a
 * "Change" action that opens the matching editor.
 */
export default function FieldChangeList({
  fields,
  drafts,
  onDraftChange,
  employeeId,
  onOpenCurrentFile,
  proofs,
  onProofSelect,
  errors = {},
}: FieldChangeListProps) {
  return (
    <div className="space-y-6">
      {GROUP_ORDER.map((group) => {
        const groupFields = fields.filter((f) => f.group === group)
        if (!groupFields.length) return null
        return (
          <section key={group} className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">{GROUP_LABELS[group]}</h3>
            <div className="divide-y divide-border-default/60 border border-border-default rounded-2xl bg-white">
              {groupFields.map((field) => {
                const editing = field.key in drafts
                return (
                  <div key={field.key} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-caption font-semibold text-secondary flex items-center gap-2">
                          {field.label}
                          {field.sensitivity === 'RESTRICTED' && (
                            <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#B45309] text-[10px] font-bold">
                              RESTRICTED
                            </span>
                          )}
                          {field.requiresProof && (
                            <span className="text-[10px] font-semibold text-secondary">· proof required</span>
                          )}
                        </div>
                        <div className="text-body-small text-primary mt-0.5">
                          <FieldValue field={field} value={field.value} onOpenFile={onOpenCurrentFile} />
                        </div>
                      </div>
                      {field.hasOpenRequest ? (
                        <span className="text-caption text-secondary shrink-0">Request open</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onDraftChange(field.key, editing ? undefined : initialEditorValue(field, field.value))
                          }
                          className="text-caption font-semibold text-primary underline cursor-pointer shrink-0"
                        >
                          {editing ? 'Cancel' : 'Change'}
                        </button>
                      )}
                    </div>

                    {editing && (
                      <div className="space-y-3 bg-bg-subtle/50 rounded-xl p-3">
                        <FieldEditor
                          field={field}
                          value={drafts[field.key]}
                          onChange={(value) => onDraftChange(field.key, value)}
                          employeeId={employeeId}
                        />
                        {field.requiresProof && onProofSelect && (
                          <div className="max-w-[220px]">
                            <DocumentCard
                              title="Proof document"
                              doc={proofs?.[field.key]}
                              error={errors[`proof.${field.key}`]}
                              onFileSelect={(file) => onProofSelect(field.key, file)}
                            />
                          </div>
                        )}
                        {errors[field.key] && (
                          <p className="text-[11px] font-medium text-error">{errors[field.key]}</p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
