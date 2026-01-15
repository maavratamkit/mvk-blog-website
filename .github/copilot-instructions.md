<!-- Copilot / AI agent instructions for mvk-blog-website -->
# Repo snapshot

- Tech: Vite + React + TypeScript + TailwindCSS
- Data layer: small homegrown API utilities + Supabase client stub
- Client caching: @tanstack/react-query for data fetching and cache management
- Services: `src/services/*` contain data-access functions (currently return mocked data with simulated delay)

# How to run (developer quick actions)

Install dependencies and start dev server: `npm install` then `npm run dev` (runs Vite)
Build for production: `npm run build`; preview locally: `npm run preview`
Lint: `npm run lint`

# High-level architecture and data flow (what to know first)

- Entry: `src/main.tsx` -> `App.tsx` with routes under `src/pages/`.
- UI components live in `src/components/` and are small, focused React components.
- Data flows through React Query hooks in `src/hooks/*` which call service functions in `src/services/*`.
  - Example: `useProducts.ts` uses `fetchAllProducts`, `fetchProductsByCategory` from `src/services/productService.ts` and sets cache keys like `['products']` or `['products', productId]`.
- API helpers: `src/utils/api.ts` exposes `fetcher`, `buildApiUrl`, `ApiException`, and `API_BASE_URL`.
  - Services either call `fetcher(buildApiUrl('/...'))` or return locally mocked data (most services currently return mock data for offline development).
- Supabase client: `src/lib/supabase.ts` creates the Supabase client from env vars VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
  - If adding server interactions via Supabase, import `supabase` from this file.

# Project-specific conventions and examples (be specific)

- Service functions:
  - Signature style: `export async function fetchX(...): Promise<T> { ... }` and throw `ApiException` on errors.
  - Mocking: many services use an inline `mockApiResponse` and `await new Promise(resolve => setTimeout(resolve, 800))` to simulate network latency. Replace the mock return with `return await fetcher<T>(buildApiUrl('/endpoint'))` to call the real API.
  - Files: `src/services/productService.ts`, `src/services/categoryService.ts` are good examples.
- React Query keys & cache:
  - Use structured keys like `['products']`, `['products', 'category', categorySlug]`, `['products', productId]` as existing hooks show.
  - Hooks set `staleTime` and `gcTime` — follow these patterns when adding new hooks.
- Error handling: services throw `ApiException` (from `src/utils/api.ts`). Components/hooks expect that and often present user-friendly messages.
- Types: data shapes are in `src/types/*.ts` — e.g. `Category` in `src/types/Category.ts` and `Product` in `src/types/Product.ts`. Use these when returning typed results.

# Integration points & environment

- Environment variables used in the repo:
  - VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (used in `src/lib/supabase.ts`)
- API base: change `API_BASE_URL` in `src/utils/api.ts` to switch backend endpoints (currently points at a Beeceptor mock URL).
- If adding server-side logic or secrets, follow Vite env conventions (`VITE_` prefix) and do NOT commit secret values.
- API base: change `API_BASE_URL` in `src/utils/api.ts` to switch backend endpoints (currently points at a Beeceptor mock URL). Prefer using the `VITE_API_BASE_URL` env var.
- Env / local setup: create a `.env.local` (or `.env`) at the project root and add `VITE_API_BASE_URL` — see `.env.example` for an example. Restart the Vite dev server after changing env vars.

# When editing or adding features — concrete checklist for an AI agent

- Prefer updating or adding a service in `src/services/` and corresponding typed return in `src/types/`.
- If hitting the network, prefer `fetcher<T>(buildApiUrl('/path'))` so error handling is centralized.
- Add or update a React Query hook in `src/hooks/` with a suitable `queryKey` and `staleTime` consistent with similar resources.
- Update or add a small component in `src/components/` and wire to pages in `src/pages/`.
- Keep UI changes isolated: small, presentational components should not directly call services — use hooks.

# Helpful file references (examples to open)

- `package.json` — project scripts (dev/build/preview/lint)
- `vite.config.ts` — Vite plugins and dependency opt-outs (lucide-react excluded from optimizeDeps)
- `src/utils/api.ts` — ApiException, fetcher, API_BASE_URL
- `src/lib/supabase.ts` — Supabase client and required env keys
- `src/services/productService.ts`, `src/services/categoryService.ts` — service patterns and mock-data examples
- `src/hooks/useProducts.ts` — react-query usage and cache-key conventions
- `src/types/Category.ts`, `src/types/Product.ts` — canonical data shapes

# What not to change without human confirmation

- Do not replace mock data with live API calls unless the backend endpoint and credentials are available and approved.
- Avoid committing any `.env` files or secrets. Use the `VITE_` env pattern and instruct maintainers to set secrets in their environment.

If any of the above assumptions are incorrect (for example: a private API contract, a different env naming convention, or an intended backend that differs from `API_BASE_URL`), tell me which part to change and I will update the instructions accordingly.
