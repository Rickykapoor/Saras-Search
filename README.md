# Saras Search

A fast, modern search tool UI built with **Vue.js 3** and **Vite**. Features real-time search results, expandable cards, infinite scrolling, dark mode, and smooth animations.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)

---

## Features

- 🔍 **Real-time search** – results update dynamically as you type (debounced at 300 ms)
- 📄 **Expandable result cards** – click any result to reveal detailed metadata
- ♾️ **Infinite scrolling** – automatically loads more results as you scroll down
- 🌙 **Dark mode** – toggle between light and dark themes
- ✨ **Smooth animations** – Vue `<Transition>` / `<TransitionGroup>` with staggered fade-in, slide, and expand effects
- 📱 **Fully responsive** – works on desktop, tablet, and mobile
- ♿ **Accessible** – ARIA roles, keyboard navigation, and focus management
- 🧩 **Modular architecture** – reusable components, composables, and service layer

---

## Project Structure

```
src/
├── main.js                     # App entry point
├── App.vue                     # Root layout & dark mode
├── assets/
│   └── main.css                # Design tokens, reset, transitions
├── components/
│   ├── SearchBar.vue           # Search input with clear & loading indicator
│   ├── SearchResultList.vue    # Result list + infinite scroll sentinel
│   ├── SearchResultItem.vue    # Expandable result card
│   └── LoaderPlaceholder.vue   # Spinner & skeleton loaders
├── composables/
│   └── useSearch.js            # Reactive search state & debounce
└── services/
    └── api.js                  # Dummy API (Postman Echo + generated data)
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.19.0 or ≥ 22.12.0
- **pnpm** (recommended) or npm

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
pnpm preview   # Preview the production build locally
```

---

## How It Works

### Search Flow
1. User types in the **SearchBar** → query is v-modeled to the composable
2. **useSearch** debounces input (300 ms) then calls the API service
3. **api.js** POSTs to Postman Echo (real network request) and generates deterministic dummy results with simulated 400–800 ms latency
4. Results are rendered via **SearchResultList** using `<TransitionGroup>` with staggered delays
5. Scrolling to the bottom triggers an Intersection Observer that calls `loadMore()` for the next page (up to 50 results)

### Component Communication
- **Props down, events up** – standard Vue pattern
- `useSearch` composable centralises all state; no Vuex/Pinia needed for this scope
- `v-model` on SearchBar for two-way query binding

---

## Scaling for Larger Applications

| Concern | Current Approach | At Scale |
|---------|-----------------|----------|
| **State management** | Single composable | Pinia store with modules for search, filters, history |
| **API layer** | Dummy service | Axios/fetch wrapper with interceptors, retry, caching |
| **Routing** | Single page | Vue Router with search as a route, result detail pages |
| **Search** | Client-generated data | Elasticsearch / Algolia / Typesense backend |
| **Performance** | Eager rendering | Virtual scrolling (vue-virtual-scroller), lazy components |
| **Testing** | Manual browser testing | Vitest unit tests + Cypress/Playwright E2E |
| **i18n** | English only | vue-i18n for multi-language support |
| **Error handling** | Basic try/catch | Global error boundary, toast notifications, retry queues |

### Performance Improvements
- **Virtual scrolling** – render only visible items for 1000+ results
- **Service Worker caching** – cache API responses for offline / instant re-display
- **Code splitting** – lazy-load result detail modals or heavy components
- **Server-side rendering (SSR)** – Nuxt.js for SEO-critical deployments
- **Web Workers** – offload search ranking / filtering to a background thread

---

## Tech Stack

- **Vue.js 3** (Composition API, `<script setup>`)
- **Vite 8** (dev server & bundler)
- **Vanilla CSS** (custom properties, no framework)
- **Postman Echo** (dummy network requests)