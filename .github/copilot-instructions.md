# Copilot Instructions for Chat-AI-Nav

## 1. Tech Stack & Architecture

- **Frontend:** Next.js 14+, React 18+, TypeScript, Tailwind CSS, next-themes, next-i18next
- **Backend:** Express, MongoDB, Mongoose
- Follow modular, component-based, type-safe, and responsive design principles

## 2. Code Style

- Use TypeScript with strict type definitions; place interfaces/types in `types/` or local `*.d.ts` files
- Prefer functional components and React Hooks
- File naming: Components use PascalCase, utility functions use camelCase
- Variables/functions use camelCase; constants use UPPER_SNAKE_CASE
- Enforce code formatting with ESLint and Prettier

## 3. Project Structure

- app: Next.js App Router, pages, and layouts
- components: React components (common/layout/modules)
- `src/lib/`: Utilities and configuration
- `src/models/`: Mongoose data models
- `src/types/`: Global TypeScript types
- public: Static assets
- `config/`: Configuration files

## 4. Component Development

- Components must support both dark and light themes (Tailwind `dark:` prefix)
- Props must have explicit TypeScript types
- Ensure responsive design (Tailwind responsive classes)
- Use a `variant` prop for component variants
- Event callbacks (e.g., `onFavoriteToggle`) must pass necessary parameters
- Use Next.js `<Image />` for images, handle load errors gracefully
- Use localStorage for local state (e.g., favorites), with SSR checks

## 5. Navigation/Layout

- Navbar supports multi-level menus, theme switching, and mobile collapse
- Use `next-themes` for theme management
- Separate navigation config into `navConfig.ts`
- Dynamically import Navbar in layout to avoid hydration errors
- Use semantic tags (`main`, `footer`)

## 6. API Design

- RESTful APIs with unified response format
- Use JWT for authentication
- Standardized error handling
- Data models should follow documentation (e.g., Tool, User)

## 7. Best Practices

- Lazy load images, use skeletons and error placeholders
- Control event propagation (e.g., favorite button)
- Use code splitting and dynamic imports for components
- Distinguish SSR/CSR; check `typeof window !== 'undefined'` for client APIs
- Use SWR/React Query for data fetching
- Support global theme and internationalization

## 8. Performance & Accessibility

- Use Tailwind for optimized responsive and theme support
- Components must support keyboard navigation and ARIA labels
- Lazy load non-critical content
- Ensure good accessibility for all components and pages

## 9. Commit & Testing

- Use Conventional Commits for Git
- Unit tests with Jest, component tests with React Testing Library
- E2E tests with Cypress

---

All code must be type-safe, responsive, theme-adaptive, accessible, and maintainable.
