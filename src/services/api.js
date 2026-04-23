/**
 * Dummy API Service
 *
 * Sends the search query to Postman Echo (which mirrors it back), then
 * generates deterministic fake results seeded from the query + page number.
 * A random delay simulates real-world network latency.
 */

const POSTMAN_ECHO_URL = 'https://postman-echo.com/post'
const RESULTS_PER_PAGE = 10
const MAX_PAGES = 5 // caps infinite scroll at 50 total results

/**
 * Simple hash to seed deterministic results from a string.
 * @param {string} str
 * @returns {number}
 */
function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

/**
 * Build a single dummy result object.
 */
function buildResult(query, index) {
  const id = hashCode(`${query}-${index}`)
  const categories = ['Technology', 'Science', 'Design', 'Business', 'Engineering', 'Research', 'Education', 'Health']
  const authors = ['Alice Chen', 'Bob Martinez', 'Clara Osei', 'David Kim', 'Eva Johansson', 'Farhan Patel']
  const domains = ['medium.com', 'dev.to', 'arxiv.org', 'github.com', 'stackoverflow.com', 'wikipedia.org', 'docs.vue.org', 'web.dev']

  return {
    id,
    title: `${query.charAt(0).toUpperCase() + query.slice(1)} – Result #${index + 1}: ${categories[id % categories.length]} Insights`,
    snippet: `Explore comprehensive findings related to "${query}". This resource covers key concepts, practical applications, and the latest developments in ${categories[(id + 1) % categories.length].toLowerCase()}.`,
    description: `This in-depth article provides a thorough analysis of "${query}" within the context of modern ${categories[id % categories.length].toLowerCase()}. Topics include implementation strategies, performance benchmarks, best practices, and real-world case studies gathered from industry leaders. Whether you are a beginner or an advanced practitioner, this resource offers actionable takeaways to enhance your understanding.`,
    metadata: {
      author: authors[id % authors.length],
      date: new Date(2024, id % 12, (id % 28) + 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      category: categories[id % categories.length],
      source: domains[id % domains.length],
      readTime: `${(id % 12) + 2} min read`,
    },
  }
}

/**
 * Search the dummy API.
 *
 * @param {string} query  – search term
 * @param {number} page   – 1-indexed page number
 * @returns {Promise<{ results: Array, hasMore: boolean }>}
 */
export async function searchApi(query, page = 1) {
  if (!query || !query.trim()) {
    return { results: [], hasMore: false }
  }

  // Call Postman Echo so we make a real network request
  try {
    await fetch(POSTMAN_ECHO_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ query, page }),
    })
  } catch {
    // Postman Echo may fail due to CORS or network; that's fine,
    // we still return generated results so the UI always works.
  }

  // Simulate network latency (400–800 ms)
  await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 400))

  // Generate results for this page
  const startIndex = (page - 1) * RESULTS_PER_PAGE
const results = []

for (let i = 0; i < RESULTS_PER_PAGE; i++) {
  results.push(
    buildResult(query.trim(), startIndex + i)
  )
}

  return {
    results,
    hasMore: page < MAX_PAGES,
  }
}
