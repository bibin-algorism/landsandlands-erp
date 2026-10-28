import { Injectable } from '@nestjs/common';
import { AuditActorType, Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import {
  AuditAction,
  AuditEntityType,
  AuditFieldChange,
} from '@landsandlands/shared';

export interface AuditEntry {
  /** User who performed the action; omit for system/background actions. */
  actorUserId?: string | null;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId: string;
  reason?: string | null;
  changes?: AuditFieldChange[];
  metadata?: Record<string, unknown>;
}

/**
 * Public interface of the Audit module. Other modules call `record` inside their own
 * Prisma transaction so the audit row commits or rolls back with the business change.
 * The audit trail is append-only: this service intentionally exposes no update/delete.
 */
@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async record(tx: Prisma.TransactionClient, entry: AuditEntry): Promise<void> {
    await tx.auditLog.create({
      data: {
        actorType: entry.actorUserId
          ? AuditActorType.USER
          : AuditActorType.SYSTEM,
        actorUserId: entry.actorUserId ?? null,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        reason: entry.reason ?? null,
        changes: entry.changes?.length
          ? (entry.changes as unknown as Prisma.InputJsonValue)
          : undefined,
        metadata: entry.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }

  /** Audit trail of one record, newest first; optionally only entries that changed `field`. */
  async listForEntity(entityType: AuditEntityType, entityId: string, options: { field?: string } = {}) {
    return this.prisma.auditLog.findMany({
      where: {
        entityType,
        entityId,
        ...(options.field && { changes: { array_contains: [{ field: options.field }] } }),
      },
      orderBy: { occurredAt: 'desc' },
      take: 500,
    });
  }

  /** Diff `before` against `after` for the given fields, keeping only changed values. */
  diff(
    before: Record<string, unknown>,
    after: Record<string, unknown>,
    redactFields: readonly string[] = [],
  ): AuditFieldChange[] {
    const changes: AuditFieldChange[] = [];
    for (const [field, newValue] of Object.entries(after)) {
      if (newValue === undefined) continue;
      const oldValue = before[field] ?? null;
      if (oldValue === newValue) continue;
      const redact = redactFields.includes(field);
      changes.push({
        field,
        old: redact ? '[REDACTED]' : oldValue,
        new: redact ? '[REDACTED]' : newValue,
      });
    }
    return changes;
  }
}
