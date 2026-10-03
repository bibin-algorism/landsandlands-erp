import { Link } from 'react-router-dom'
import Alert from '../components/Alert'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-default text-primary p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="border-b border-border-default pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-display text-primary">Lands and Lands ERP V5.0</h1>
            <p className="text-body-medium text-secondary">
              Design Foundation Semantic Colors & Typography
            </p>
          </div>
          <Link
            to="/login"
            className="py-2 px-4 bg-brand-accent text-primary text-label font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Login
          </Link>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-brand-accent mb-2"></span>
            <span className="text-label text-primary">Brand Accent</span>
          </div>
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-success mb-2"></span>
            <span className="text-label text-primary">Success</span>
          </div>
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-warning mb-2"></span>
            <span className="text-label text-primary">Warning</span>
          </div>
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-error mb-2"></span>
            <span className="text-label text-primary">Error</span>
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-border-default">
          <h2 className="text-h3 text-primary">Alert Variants</h2>
          <div className="space-y-3">
            <Alert
              variant="success"
              title="Success Alert"
              message="Your changes have been saved successfully."
            />
            <Alert
              variant="info"
              title="Info Alert"
              message="System maintenance scheduled for 10:00 PM."
            />
            <Alert
              variant="warning"
              title="Warning Alert"
              message="Your session will expire in 5 minutes."
            />
            <Alert
              variant="error"
              title="Error Alert"
              message="Failed to connect to server. Please try again."
            />
          </div>
        </section>
      </div>
    </div>
  )
}
