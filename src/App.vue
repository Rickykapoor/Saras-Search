<template>
  <div class="app">
    <!-- Header -->
    <header class="app__header">
      <div class="container app__header-inner">
        <div class="app__brand">
          <svg class="app__logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h1 class="app__title">Saras Search</h1>
        </div>

        <!-- Dark mode toggle -->
        <button class="app__theme-toggle" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme">
          <Transition name="fade" mode="out-in">
            <svg v-if="isDark" key="sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg v-else key="moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </Transition>
        </button>
      </div>
    </header>


  </div>


</template>

<script setup>
import { ref } from 'vue'


const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

</script>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.app__header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--background);
  border-bottom: 1px solid var(--border);
  transition: background-color var(--transition-base), border-color var(--transition-base);
}

.app__header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
}

.app__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.app__logo {
  color: var(--foreground);
}

.app__title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--foreground);
}

.app__theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius);
  border: 1px solid var(--input);
  color: var(--foreground);
  background: var(--background);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.app__theme-toggle:hover {
  background-color: var(--accent);
  border-color: var(--ring);
}
</style>
