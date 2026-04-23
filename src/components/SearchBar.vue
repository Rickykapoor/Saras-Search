<template>
    <div class="search-bar" role="search">
        <div class="search-bar__wrapper">
            <!-- Search icon -->
            <svg class="search-bar__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196
        5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>


            <input id="search-input" ref="inputRef" type="text" :value="modelValue" placeholder="Search anything…"
                aria-label="Search query" autocomplete="off" @input="$emit('update:modelValue', $event.target.value)"
                @keydown.escape="handleClear" />

            <!-- Loading spinner -->
            <Transition name="fade">
                <span v-if="loading" class="search-bar__spinner" aria-label="Searching…">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                </span>
            </Transition>

            <!-- Clear button -->
            <Transition name="fade">
                <button v-if="modelValue && !loading" class="search-bar__clear" aria-label="Clear search"
                    @click="handleClear">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    modelValue: { type: String, default: '' },
    loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])
const inputRef = ref(null)

function handleClear() {
    emit('update:modelValue', '')
    inputRef.value?.focus()
}
</script>

<style scoped>
.search-bar {
    width: 100%;
}

.search-bar__wrapper {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    height: 40px;
    padding: 0 12px;
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
}

.search-bar__wrapper:focus-within {
    border-color: var(--muted-foreground);
    box-shadow: 0 0 0 1px var(--muted-foreground);
}

.search-bar__icon {
    flex-shrink: 0;
    color: var(--muted-foreground);
}

input {
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--foreground);
    outline: none;
    box-shadow: none;
}

input:focus-visible {
    outline: none;
    box-shadow: none;
}

input::placeholder {
    color: var(--muted-foreground);
}

.search-bar__clear {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: calc(var(--radius) - 2px);
    color: var(--muted-foreground);
    transition:
        background-color var(--transition-fast),
        color var(--transition-fast);
}

.search-bar__clear:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
}

.search-bar__spinner {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: var(--muted-foreground);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
