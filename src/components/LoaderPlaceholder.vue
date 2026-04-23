<template>
    <div class="loader" :class="`loader--${variant}`">
        <!-- Spinner variant -->
        <template v-if="variant === 'spinner'">
            <div class="loader__spinner">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
            </div>
        </template>

        <!-- Skeleton variant -->
        <template v-else>
            <div v-for="n in count" :key="n" class="loader__card" :style="{ animationDelay: `${(n - 1) * 150}ms` }">
                <div class="skeleton skeleton--title" />
                <div class="skeleton skeleton--line" />
                <div class="skeleton skeleton--short" />
            </div>
        </template>
    </div>
</template>

<script setup>
defineProps({
    variant: {
        type: String,
        default: 'skeleton',
        validator: (v) => ['spinner', 'skeleton'].includes(v),
    },
    count: { type: Number, default: 3 },
})
</script>

<style scoped>
.loader {
    width: 100%;
}

/* Spinner */
.loader__spinner {
    display: flex;
    justify-content: center;
    padding: var(--space-xl) 0;
    color: var(--muted-foreground);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Skeleton cards */
.loader__card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: var(--space-md) var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.loader__card+.loader__card {
    margin-top: var(--space-md);
}

.skeleton--title {
    width: 55%;
    height: 16px;
}

.skeleton--line {
    width: 100%;
    height: 12px;
}

.skeleton--short {
    width: 35%;
    height: 12px;
}
</style>
