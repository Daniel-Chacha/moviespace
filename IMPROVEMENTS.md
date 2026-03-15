# MovieSpace — Improvements Log

## Overview

This document records all architectural improvements made to the MovieSpace codebase, the rationale behind each change, and any follow-up actions required.

---

## 1. Constants File — `src/app/lib/constants.ts` (New)

**What changed:** All hardcoded values (TMDB genre IDs, Kitsu base URL, TMDB image base URL, anime genre list, and the `MediaType` union type) are centralised in a single file.

**Why:** Genre IDs and base URLs were scattered across `tmdb.ts`, `movies.tsx`, `anime.tsx`, `longAnimations.tsx`, and `series.tsx`. Any change (e.g. a renamed genre or new API version) required touching multiple files and risked inconsistency.

---

## 2. TMDB API Key Security — `src/app/api/tmdb/route.ts` (New)

**What changed:** A Next.js Route Handler (`GET /api/tmdb`) now proxies all TMDB requests server-side. The `NEXT_PUBLIC_TMDB_API_KEY` environment variable is no longer required in client bundles.

**Why:** `NEXT_PUBLIC_*` variables are embedded into the JavaScript bundle shipped to every browser. Anyone could extract the API key from the page source. The proxy keeps the key server-side only.

**Action required:** Rename your environment variable from `NEXT_PUBLIC_TMDB_API_KEY` to `TMDB_API_KEY` in your `.env.local` file. The route handler falls back to `NEXT_PUBLIC_TMDB_API_KEY` during the transition period, so the app continues to work before you rename it.

**Bonus:** The route handler sets `next: { revalidate: 3600 }` on all TMDB responses, giving 1-hour server-side caching at no extra cost.

---

## 3. Unified HTTP Client — `src/app/lib/tmdb.ts` (Modified)

**What changed:** Removed `axios` from all TMDB fetch calls. The entire `tmdb.ts` file now uses native `fetch` exclusively. The `'use client'` directive (which had no effect on a utility module) was also removed.

**Why:** Two HTTP clients (`axios` and `fetch`) were used inconsistently in the same file. Native `fetch` is built into the browser and Node.js 18+, integrates with Next.js caching, and removes an unnecessary dependency. Axios is still listed in `package.json` but is no longer imported anywhere — it can be removed with `npm uninstall axios`.

**Bonus:** The Kitsu API mapping logic was deduplicated into a single `mapKitsuToMovie()` helper, eliminating ~100 lines of copy-pasted mapping code across `fetchTrendingAnime`, `fetchPopularAnime`, `fetchUpcomingAnime`, and `fetchAnimeByGenre`.

---

## 4. Custom Hooks for State Management

### `src/app/hooks/useGenreCategories.ts` (New)
### `src/app/hooks/useAnimeCategories.ts` (New)

**What changed:** The explosion of `useState` hooks in `movies.tsx` (13 states), `series.tsx` (12 states), `longAnimations.tsx` (11 states), and `anime.tsx` (35+ states) was replaced by two custom hooks.

- `useGenreCategories(configs)` — accepts an array of `{ label, fetcher }` configs and loads all categories in parallel via `Promise.all`. Used by Movies, Series, and Animations.
- `useAnimeCategories()` — fetches trending/popular/upcoming in parallel, then sequentially loads 32 genre categories to avoid overwhelming the Kitsu rate limiter.

**Why:** Having one `useState` per category made components unmaintainable and made it impossible to add loading/error states without multiplying the problem. The hooks encapsulate all data-fetching logic and expose a clean `{ categories, isLoading, error }` API.

---

## 5. Loading States & Skeleton UI — `src/app/components/skeleton.tsx` (New)

**What changed:** A `CategorySkeleton` component was added that renders 8 animated placeholder cards (`animate-pulse`) while data loads. `Category` renders the skeleton when `isLoading=true`.

**Why:** Users previously saw blank rows with no indication that content was loading. The skeleton communicates that data is on its way and prevents layout shift.

---

## 6. Error States — `src/app/components/genres.tsx` (Modified)

**What changed:** `Genres` now accepts `isLoading` and `error` props. When `error` is non-null it renders a visible error message instead of silently showing empty rows.

**Why:** API failures previously logged to the console only. Users saw blank pages with no explanation.

---

## 7. Removed `usePathname` from Item and Info — Explicit `mediaType` Prop

### `src/app/components/item.tsx` (Modified)
### `src/app/components/info.tsx` (Modified)
### `src/app/components/genres.tsx` (Modified)
### `src/app/components/category.tsx` (Modified)

**What changed:** `Item` and `Info` previously called `usePathname()` and compared the current URL against known path prefixes to decide what buttons to show. This was replaced by an explicit `mediaType: 'movie' | 'series' | 'anime' | 'animation'` prop threaded down from the gallery page through `Genres` → `Category` → `Item` / `Info`.

**Why:** URL-based conditional rendering is fragile — any route change silently breaks behaviour. Explicit props are self-documenting, testable, and decouple the card component from routing concerns. `Info` opened from search still derives its media type from `infoContent.media_type` (correct behaviour, unchanged).

---

## 8. Gallery Components Refactored

### `src/app/components/movies.tsx` (Modified)
### `src/app/components/series.tsx` (Modified)
### `src/app/components/anime.tsx` (Modified)
### `src/app/components/longAnimations.tsx` (Modified)

**What changed:** Each gallery component now defines its category configuration as a module-level constant array and calls the corresponding custom hook. All local `useState`/`useEffect` data-fetching boilerplate was removed.

**Before / After — `movies.tsx`:**
- Before: 13 `useState` calls + 1 `useEffect` with 13 sequential `await` calls
- After: 1 constant array + 1 `useGenreCategories()` call

---

## 9. Search Input Validation — `src/app/components/searchTmdb.tsx` (Modified)

**What changed:**
- Queries shorter than 2 characters (after trimming) no longer trigger an API call.
- Results are cleared immediately when the input falls below the minimum length — no waiting for the 500 ms debounce.
- Fixed a logic bug: the "No results" message previously showed when `isLoading=true` (it now only shows when not loading and query is long enough).

**Why:** Single-character queries return noisy results and waste API quota. Clearing results immediately on short input gives a cleaner UX.

---

## 10. Removed `'use client'` from Pure Type Files

### `src/app/components/interfaces.tsx` (Modified)

**What changed:** The `'use client'` directive at the top of `interfaces.tsx` was removed.

**Why:** `interfaces.tsx` contains only TypeScript type/interface definitions. The `'use client'` directive has no effect on non-component modules and was misleading.

---

## Follow-up Actions (Manual)

| Action | Priority | Notes |
|--------|----------|-------|
| Rename `NEXT_PUBLIC_TMDB_API_KEY` → `TMDB_API_KEY` in `.env.local` | High | Completes the API key security improvement |
| Run `npm uninstall axios` | Low | Axios is no longer imported; safe to remove |
| Add error boundaries around page sections | Medium | Would catch unexpected runtime errors gracefully |
| Consider `SWR` or `React Query` for client-side caching | Medium | Would prevent re-fetching on tab switch/navigation |
