<template>
  <div class="result-list">
    <!-- Empty state -->
    <Transition name="fade">
      <div v-if="!loading && !results.length && hasSearched" class="result-list__empty">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="8" x2="14" y2="14" />
          <line x1="14" y1="8" x2="8" y2="14" />
        </svg>
        <p class="result-list__empty-title">No results found</p>
        <p class="result-list__empty-subtitle">Try adjusting your search terms</p>
      </div>
    </Transition>

    <!-- Results -->
    <TransitionGroup
      name="list"
      tag="ul"
      class="result-list__items"
      v-if="results.length"
    >
      <li
        v-for="(result, index) in results"
        :key="result.id"
        :style="{ transitionDelay: `${Math.min(index * 50, 250)}ms` }"
      >
        <SearchResultItem
          :title="result.title"
          :snippet="result.snippet"
          :description="result.description"
          :metadata="result.metadata"
          :is-expanded="expandedId === result.id"
          @toggle="toggleItem(result.id)"
        />
      </li>
    </TransitionGroup>

    <!-- Loading more indicator -->
    <Transition name="fade">
      <div v-if="loadingMore" class="result-list__loading-more">
        <LoaderPlaceholder variant="spinner" :count="1" />
      </div>
    </Transition>

    <!-- Infinite scroll sentinel -->
    <div ref="sentinel" class="result-list__sentinel" aria-hidden="true" />

    <!-- End of results -->
    <Transition name="fade">
      <p v-if="results.length && !hasMore && !loadingMore" class="result-list__end">
        You've reached the end of results
      </p>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import SearchResultItem from './SearchResultItem.vue'
import LoaderPlaceholder from './LoaderPlaceholder.vue'

const props = defineProps({
  /** Array of result objects */
  results: { type: Array, default: () => [] },
  /** Whether the initial search is loading */
  loading: { type: Boolean, default: false },
  /** Whether more results are loading (pagination) */
  loadingMore: { type: Boolean, default: false },
  /** Whether more pages are available */
  hasMore: { type: Boolean, default: false },
  /** Whether the user has initiated at least one search */
  hasSearched: { type: Boolean, default: false },
})

const emit = defineEmits(['load-more'])

/** FAQ-style accordion — only one item expanded at a time */
const expandedId = ref(null)

function toggleItem(id) {
  expandedId.value = expandedId.value === id ? null : id
}

const sentinel = ref(null)
let observer = null

/** Set up Intersection Observer for infinite scroll */
function setupObserver() {
  if (!sentinel.value) return

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && props.hasMore && !props.loadingMore && !props.loading) {
        emit('load-more')
      }
    },
    { rootMargin: '200px' },
  )

  observer.observe(sentinel.value)
}

onMounted(setupObserver)

onUnmounted(() => {
  observer?.disconnect()
})

// Re-observe when results change (sentinel may have moved)
watch(() => props.results.length, () => {
  observer?.disconnect()
  setupObserver()
})
</script>

<style scoped>
.result-list {
  width: 100%;
}

.result-list__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  position: relative;
}

.result-list__items li {
  list-style: none;
}

/* Empty state */
.result-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-3xl) var(--space-lg);
  text-align: center;
  color: var(--muted-foreground);
}

.result-list__empty-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--foreground);
}

.result-list__empty-subtitle {
  font-size: 0.8125rem;
}

/* Loading more */
.result-list__loading-more {
  display: flex;
  justify-content: center;
  padding: var(--space-lg) 0;
}

/* Sentinel (invisible) */
.result-list__sentinel {
  height: 1px;
}

/* End of results */
.result-list__end {
  text-align: center;
  font-size: 0.75rem;
  color: var(--muted-foreground);
  padding: var(--space-lg) 0;
}
</style>
