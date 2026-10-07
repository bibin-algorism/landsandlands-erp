import { Link } from 'react-router-dom'
import type { Column } from '../../components/common/DataTable'
import type { ClientListItem } from '../../api/types'
import StatusBadge from '../../components/common/StatusBadge'
import Avatar from '../../components/common/Avatar'

export const getClientColumns = (): Column<ClientListItem>[] => [
  {
    key: 'clientCode',
    header: 'Client Code',
    cellClassName: 'text-body-small text-primary font-semibold',
    render: (client) => client.clientCode || '-',
  },
  {
    key: 'name',
    header: 'Client Name',
    render: (client) => {
      const displayName = client.name || 'N/A'
      return (
        <div className="flex items-center gap-3">
          <Avatar name={displayName} size={32} />
          <div>
            <div className="font-semibold text-primary text-body-small">{displayName}</div>
            <div className="text-caption text-secondary">
              {client.clientType === 'CORPORATE' ? 'Corporate Client' : 'Individual Client'}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'contact',
    header: 'Contact Info',
    render: (client) => {
      const contact = client.contact
      return (
        <div className="text-body-small">
          <div className="text-primary font-medium">{contact?.primaryPhone || '-'}</div>
          <div className="text-caption text-secondary">{contact?.email || '-'}</div>
        </div>
      )
    },
  },
  {
    key: 'primaryRM',
    header: 'Relationship Manager',
    render: (client) => {
      const rm = client.primaryRM
      if (!rm) return <span className="text-secondary">-</span>
      return (
        <span className="text-body-small text-primary font-medium">
          {rm.firstName} {rm.lastName}
        </span>
      )
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: (client) => {
      const status = client.status || 'ACTIVE'
      return <StatusBadge label={status} />
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (client) => (
      <div className="flex items-center gap-2">
        <Link
          to={`/clients/${client.clientCode || client.id}`}
          className="text-body-small font-medium text-brand-accent hover:underline"
        >
          View details
        </Link>
      </div>
    ),
  },
]
