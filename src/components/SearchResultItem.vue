<template>
    <article class="result-item" :class="{ 'result-item--expanded': isExpanded }" tabindex="0" role="button"
        :aria-expanded="isExpanded" @click="$emit('toggle')" @keydown.enter="$emit('toggle')"
        @keydown.space.prevent="$emit('toggle')">
        <!-- Header -->
        <div class="result-item__header">
            <div class="result-item__info">
                <h3 class="result-item__title">{{ title }}</h3>
                <p class="result-item__snippet">{{ snippet }}</p>
            </div>

            <span class="result-item__chevron" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </span>
        </div>

        <!-- Expandable detail -->
        <Transition name="expand">
            <div v-if="isExpanded" class="result-item__detail">
                <p class="result-item__description">{{ description }}</p>

                <div class="result-item__meta">
                    <span class="meta-badge" v-if="metadata.category">{{ metadata.category }}</span>
                    <span class="meta-separator" v-if="metadata.category && metadata.author">·</span>
                    <span class="meta-text" v-if="metadata.author">{{ metadata.author }}</span>
                    <span class="meta-separator" v-if="metadata.author && metadata.date">·</span>
                    <span class="meta-text" v-if="metadata.date">{{ metadata.date }}</span>
                    <span class="meta-separator" v-if="metadata.date && metadata.source">·</span>
                    <span class="meta-text meta-text--muted" v-if="metadata.source">{{ metadata.source }}</span>
                    <span class="meta-separator" v-if="metadata.source && metadata.readTime">·</span>
                    <span class="meta-text meta-text--muted" v-if="metadata.readTime">{{ metadata.readTime }}</span>
                </div>
            </div>
        </Transition>
    </article>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    description: { type: String, default: '' },
    metadata: { type: Object, default: () => ({}) },
    /** Whether this item is currently expanded (controlled by parent) */
    isExpanded: { type: Boolean, default: false },
})

defineEmits(['toggle'])
</script>

<style scoped>
.result-item {
    background: var(--card);
    color: var(--card-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: var(--space-md) var(--space-lg);
    cursor: pointer;
    transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        box-shadow var(--transition-fast);
    user-select: none;
}

.result-item:hover {
    background-color: var(--accent);
    border-color: var(--ring);
}

.result-item--expanded {
    border-color: var(--ring);
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.result-item:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

/* Header */
.result-item__header {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
}

.result-item__info {
    flex: 1;
    min-width: 0;
}

.result-item__title {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: var(--foreground);
}

.result-item__snippet {
    margin-top: 4px;
    font-size: 0.8125rem;
    color: var(--muted-foreground);
    line-height: 1.5;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Chevron */
.result-item__chevron {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: calc(var(--radius) - 2px);
    color: var(--muted-foreground);
    transition: transform var(--transition-base);
}

.result-item--expanded .result-item__chevron {
    transform: rotate(180deg);
}

/* Detail panel */
.result-item__detail {
    margin-top: var(--space-md);
    padding-top: var(--space-md);
    border-top: 1px solid var(--border);
}

.result-item__description {
    font-size: 0.8125rem;
    color: var(--muted-foreground);
    line-height: 1.7;
    margin-bottom: var(--space-md);
}

/* Metadata row */
.result-item__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-xs);
    font-size: 0.75rem;
}

.meta-badge {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 8px;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--primary-foreground);
    background: var(--primary);
    border-radius: 9999px;
}

.meta-text {
    font-weight: 500;
    color: var(--foreground);
}

.meta-text--muted {
    font-weight: 400;
    color: var(--muted-foreground);
}

.meta-separator {
    color: var(--muted-foreground);
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
    transition: all var(--transition-base);
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
    padding-top: 0;
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 500px;
}

/* Responsive */
@media (max-width: 480px) {
    .result-item {
        padding: var(--space-sm) var(--space-md);
    }
}
</style>
