# Architectural Decision Record (ADR): Configurable Custom DataTable Component

**Status:** Accepted  
**Date:** 2026-10-07  
**Decision Makers:** Engineering Team  

---

## Context & Problem Statement

The Lands & Lands ERP web frontend (`apps/web`) requires data table views across multiple core modules (Employees, Clients, Properties, Onboarding). 

The ERP design system enforces specific aesthetic standards:
- **Glassmorphism Container**: `bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-4 sm:p-6 shadow-xs`
- **Floating Row Layout**: Spaced table rows via `border-separate border-spacing-y-2.5` with standard `h-[60px]` height.
- **Custom Cell End-Caps**: Outer left and right row cells feature `rounded-l-[10px]` and `rounded-r-[10px]` border radii with subtle hover highlights (`group-hover:bg-bg-subtle/50`).
- **Dynamic Cell & Action Slot Rendering**: Custom badge components, avatars, multi-line typography, contextual kebab dropdown menus (`edit`, `delete`, etc.), and inline row action buttons.

---

## Decision

We decided to build an **in-house, reusable `<DataTable<T>>` component** (`src/components/common/DataTable.tsx`) tailored to our design system, rather than adopting third-party table npm packages (such as `@tanstack/react-table`, `mui-data-grid`, `antd`, or `ag-grid`).

---

## Why Custom Component Over Third-Party NPM Packages?

1. **Design System & Styling Fidelity**
   - Popular table packages enforce rigid DOM wrappers, `border-collapse: collapse`, or complex CSS rules that conflict directly with our custom floating row spacing (`border-spacing-y-2.5`) and rounded cell border radii.
   - Hacking third-party table stylesheets with high-specificity CSS overrides creates fragile code that breaks easily across component updates.

2. **Zero Overhead & Bundle Size Efficiency**
   - Full-featured data grid npm packages introduce substantial JS bundle size and complex abstraction layers for enterprise features (pivot tables, column pinning, cell virtualization) that our UI does not currently require.
   - Our custom component delivers 100% of the required features in ~180 lines of clean, zero-dependency TypeScript code.

3. **Maximum Flexibility & Type Safety**
   - Strong generic typing `<DataTable<T>>` ensures compile-time checks for data properties.
   - The `Column<T>` interface allows easy rendering of standard text properties or custom JSX (`render: (row, index) => ReactNode`).
   - Built-in support for dynamic contextual kebab menus (`kebabMenuItems`) and optional extra row action slots (`renderActionsColumn`).

4. **Full Maintenance Ownership**
   - Bugs or requested UI enhancements (such as multi-select, server pagination, or sortable headers) can be implemented directly without waiting for upstream library fixes or fighting third-party API constraints.

---

## Component Architecture

```
apps/web/src/
└── components/
    └── common/
        └── DataTable.tsx     # Generic, fully typed table component
```

### Core Interface
- `columns`: Array of `Column<T>` definitions with optional custom `render` functions, header/cell class names, width, and alignment.
- `data`: Array of data items of type `T`.
- `keyExtractor`: Function returning unique string/number keys for row items.
- `onRowClick`: Optional callback when clicking a table row.
- `kebabMenuItems`: Function returning array of `KebabMenuItem<T>` objects (`label`, `icon`, `onClick`, `variant`).
- `renderActionsColumn`: Optional render prop for additional icons or action buttons in the row action cell.
