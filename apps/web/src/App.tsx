function App() {
  return (
    <div className="min-h-screen bg-bg-default text-text-primary p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="border-b border-border-default pb-4">
          <h1 className="text-display text-text-primary">Lands and Lands ERP V5.0</h1>
          <p className="text-text-secondary">Design Foundation Semantic Colors & Typography</p>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-brand-accent mb-2"></span>
            <span className="text-sm font-medium text-text-primary">Brand Accent</span>
          </div>
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-success mb-2"></span>
            <span className="text-sm font-medium text-text-primary">Success</span>
          </div>
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-warning mb-2"></span>
            <span className="text-sm font-medium text-text-primary">Warning</span>
          </div>
          <div className="p-4 rounded border border-border-default bg-surface-card shadow-sm">
            <span className="block w-4 h-4 rounded-full bg-error mb-2"></span>
            <span className="text-sm font-medium text-text-primary">Error</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App



