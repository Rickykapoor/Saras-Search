/**
 * useSearch Composable
 *
 * Encapsulates all reactive search state, debounced query watching,
 * paginated API calls, and error handling. Components only need to
 * bind to the returned refs and call loadMore().
 */

import { ref, watch } from 'vue'
import { searchApi } from '@/services/api'

/** Simple debounce helper */
function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export function useSearch() {
  const query = ref('')
  const results = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref(null)
  const hasMore = ref(false)
  const page = ref(1)

  /**
   * Perform a fresh search (page 1). Resets all state.
   */
  async function search(q) {
    const trimmed = q.trim()

    if (!trimmed) {
      results.value = []
      hasMore.value = false
      error.value = null
      page.value = 1
      return
    }

    loading.value = true
    error.value = null
    page.value = 1

    try {
      const data = await searchApi(trimmed, 1)
      results.value = data.results
      hasMore.value = data.hasMore
    } catch (err) {
      error.value = 'Something went wrong. Please try again.'
      results.value = []
      hasMore.value = false
    } finally {
      loading.value = false
    }
  }

  /**
   * Load the next page and append results. Used by infinite scroll.
   */
  async function loadMore() {
    if (loadingMore.value || !hasMore.value) return

    loadingMore.value = true
    page.value += 1

    try {
      const data = await searchApi(query.value.trim(), page.value)
      results.value = [...results.value, ...data.results]
      hasMore.value = data.hasMore
    } catch {
      // silently ignore – user can retry by scrolling again
    } finally {
      loadingMore.value = false
    }
  }

  // Debounced watcher – fires 300 ms after the user stops typing
  const debouncedSearch = debounce((q) => search(q), 300)

  watch(query, (newVal) => {
    // Immediately show loading state for responsiveness
    if (newVal.trim()) {
      loading.value = true
    }
    debouncedSearch(newVal)
  })

  return {
    query,
    results,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  }
}
