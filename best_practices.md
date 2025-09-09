# 📘 Project Best Practices

## 1. Project Purpose
FragraMap is a React (Vite) front‑end application backed by Firebase that helps users search and manage fragrances. Authentication is handled by Firebase Auth, data by Firestore (for user profiles), and a Firebase Cloud Function acts as a backend adapter to the Fragella API for search. The UI is built with Tailwind CSS.

## 2. Project Structure
- Root
  - `index.html` – Single page app entry
  - `vite.config.js` – Build tooling config
  - `eslint.config.js` – ESLint rules (React Hooks + Fast Refresh)
  - `package.json` – App dependencies and scripts
  - `functions/` – Firebase Cloud Functions (Node, callable endpoint for search)
- `src/`
  - `main.jsx` – App bootstrap (StrictMode, BrowserRouter, AuthProvider)
  - `App.jsx` – Route map using `react-router-dom`
  - `index.css` – Tailwind v4 entry + theme tokens and utilities
  - `App.css` – App‑level styles
  - `assets/` – Static assets (if any)
  - `components/` – Reusable, app‑agnostic UI components (e.g., Button)
  - `context/` – Global contexts (e.g., `AuthContext`)
  - `firebase/` – Firebase initialization (`config.js`)
  - `features/` – Feature folders grouping UI + logic by domain
    - `auth/` – Auth UI (layout) + `ProtectedRoute`
    - `search/` – Search UI (container, cards, modal)
  - `pages/` – Route pages (Home, Login, Register, Dashboard, Profile, Settings)
  - `services/` – Service layer (API/data calls). Example: `fragranceService.js` (currently empty; add abstractions here).

Conventions
- Components: PascalCase, colocate small subcomponents with the feature.
- Features: Keep stateful containers and pure presentational components separate where possible.
- Routing: If you nest routes (e.g., under `/dashboard`), ensure the layout component renders `<Outlet />`.
- Environment: Use Vite env variables (`VITE_*`) for client‑side config and `functions/.env` for server‑side secrets.

## 3. Test Strategy
Current project has no tests. Adopt the following strategy:
- Frameworks
  - Unit/Component: Vitest + React Testing Library
  - Integration (client): Vitest + RTL with MSW for network mocking
  - E2E (optional): Playwright
  - Functions: `firebase-functions-test` for unit tests; emulator for integration
- Structure
  - `src/**/__tests__/*.{test,spec}.jsx`
  - Co‑locate tests near the code under test for smaller features
- Naming
  - `ComponentName.test.jsx` for components
  - `serviceName.test.js` for services
- Mocking
  - Mock Firebase client SDK via modular mocks
  - Mock callable functions using MSW or dependency injection at the service layer
  - Prefer testing through public APIs (components/hooks/services), not implementation details
- Philosophy
  - Unit tests for pure logic (utils, services)
  - Component tests for UI and interaction
  - Integration tests for routing and auth flows
  - Target 80%+ coverage for critical paths (auth, search)

## 4. Code Style
- General
  - Use function components with hooks; avoid class components
  - Keep components focused and small; extract subcomponents/hooks as they grow
  - Enforce ESLint rules and add Prettier for formatting
- Naming
  - Components/Pages: PascalCase (e.g., `FragranceCard.jsx`)
  - Hooks: `useCamelCase`
  - Files: Match default export name; `.jsx` for React components
  - Variables/Functions: `camelCase`; constants `UPPER_SNAKE_CASE` when global
- React Hooks
  - Always include complete dependency arrays
  - Cleanup side effects in `useEffect` (return cleanup function)
  - Avoid stale closures; derive state from props or use refs where needed
- Events & Forms
  - Prefer `onKeyDown`/`onKeyUp` over deprecated `onKeyPress`
  - Always set explicit `type` on buttons (e.g., `type="button"` for non‑submit)
  - Validate input before submit; surface helpful error messages
- Error Handling
  - Wrap async calls with try/catch and report user‑friendly messages
  - Log exceptions with context; avoid exposing raw error objects to UI
  - In Cloud Functions, throw `HttpsError` with meaningful codes/messages
- Accessibility (a11y)
  - Semantic HTML for headings and landmarks
  - All images must include descriptive `alt`
  - Keyboard navigation: focus states visible; trap focus inside modals; ESC to close
  - ARIA attributes when necessary; label inputs properly
- Styling (Tailwind v4)
  - Prefer utility classes; extract repeated patterns into components/`@layer` utilities
  - Keep class lists ordered and consistent; group layout, spacing, typography
  - Theme tokens live in `@theme`; prefer tokens over raw values
- Routing
  - Import DOM router APIs from `react-router-dom` (e.g., `Navigate`, `Link`)
  - Layout routes must render `<Outlet />` for nested child routes
- Performance
  - Use `React.lazy` + `Suspense` for route‑level code splitting
  - Memoize expensive computations and list item components (`React.memo`)
  - Use keys that are stable and unique (avoid array indices if list mutates)

## 5. Common Patterns
- Provider + Hook
  - `AuthContext` + `useAuth()` expose `user`, `loading`, `logout`, `isAuthenticated`
- Protected Routing
  - `ProtectedRoute` gates content; show a loader while `loading` is true and redirect unauthenticated users
- Container vs Presentational
  - Containers (e.g., `SearchContainer`) orchestrate state and side effects
  - Presentational components (e.g., `FragranceCard`, `FragrancePreviewCard`) are pure and receive props
- Service Layer
  - Centralize external calls in `src/services/` (e.g., `fragranceService.search(q)` uses callable function)
  - Benefits: testability, isolation, and reusability
- Caching
  - Local storage or in‑memory caches for simple use cases
  - Consider SWR/React Query if evolving beyond simple caching
- Modals
  - Render in a portal; include backdrop, focus trap, and keyboard dismissal

## 6. Do's and Don'ts
- Do
  - Keep feature boundaries clear (`features/<domain>`)
  - Handle loading, empty, and error states for all async views
  - Derive UI from state; avoid duplicating authoritative sources
  - Use environment variables for configuration (Vite: `VITE_*`)
  - Prefer `react-router-dom` imports for web routing components
  - Add `<Outlet />` to layout pages that nest child routes (e.g., Dashboard)
  - Validate props and shape assumptions; consider PropTypes or migrate to TypeScript
  - Use native `fetch` in Cloud Functions (Node 18+) or add `node-fetch` as a dependency
- Don't
  - Hardcode secrets in the client; never expose private keys
  - Fire off async effects without cancellation/guards for stale responses
  - Rely on string checks for behavioral control (e.g., `title.includes('Register')`); use explicit props instead
  - Swallow errors or show raw error objects to end users
  - Use `onKeyPress` (deprecated) or rely on array indices for keys in mutable lists

## 7. Tools & Dependencies
- React 19 + Vite 7 – SPA framework and build tool
- React Router 7 – Client-side routing
- Tailwind CSS 4 – Utility‑first styling; custom theme in `index.css`
- Firebase 12 – Auth, Firestore, Functions, Analytics
- ESLint – Linting with React Hooks and Fast Refresh plugins

Setup
- Frontend
  - Node 18+ (LTS recommended)
  - `npm i`
  - Create `.env.local` with client config as needed (all keys must be prefixed with `VITE_` to be exposed):
    - Example: `VITE_FIREBASE_API_KEY=...`
  - Read via `import.meta.env.VITE_FIREBASE_API_KEY`
- Cloud Functions (`functions/`)
  - Node engine set to `22` in `functions/package.json`
  - Add `FRAGELLA_API_KEY` to `functions/.env`
  - Prefer native `fetch` (Node 18+) and remove `node-fetch` import, or add `node-fetch` to dependencies if you keep the import
  - Run locally with Firebase Emulator; deploy with `firebase deploy --only functions`

## 8. Other Notes
- Code Generation Guidelines (LLM)
  - Keep to the existing module systems: ESM in the web app, CommonJS in Functions (unless migrating)
  - Follow existing naming/file conventions and default exports
  - Use `react-router-dom` for DOM router components (e.g., `Navigate`)
  - Keep Tailwind v4 usage consistent (`@import "tailwindcss"`; prefer theme tokens)
  - When adding nested routes, update the layout page to render `<Outlet />`
  - For keyboard events, use `onKeyDown` and handle `Enter`/`Escape` explicitly
  - For modals, ensure accessibility: focus trap, ARIA roles, ESC to close
  - Place all external calls in `src/services/` and write unit tests around them
- Potential Improvements
  - Move search logic from `SearchContainer` into `fragranceService.js`
  - Add `Outlet` to `Dashboard` if child routes should render there
  - Replace deprecated `onKeyPress` in `SearchBar` with `onKeyDown`
  - Add Prettier and a CI step for lint/test
  - Introduce Vitest + RTL with MSW and set coverage thresholds
