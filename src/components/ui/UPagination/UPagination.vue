<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  totalPages: number;
}
const props = defineProps<Props>();
const currentPage = defineModel<number>({ required: true });

const visiblePages = computed(() => {
  const MAX_VISIBLE_PAGES = 3;
  const pages = [];
  let start = Math.max(
    2,
    currentPage.value - Math.floor(MAX_VISIBLE_PAGES / 2)
  );
  let end = Math.min(props.totalPages - 1, start + MAX_VISIBLE_PAGES - 1);

  if (end - start < MAX_VISIBLE_PAGES - 1) {
    start = Math.max(2, end - MAX_VISIBLE_PAGES + 1);
  }

  for (let i = start; i <= end; i++) {
    if (i > 1 && i < props.totalPages) {
      pages.push(i);
    }
  }

  return pages;
});

const showLeftEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2;
});

const showRightEllipsis = computed(() => {
  return (
    visiblePages.value.length > 0 &&
    visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
  );
});

function handlePageChange(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
  }
}
</script>

<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === 1 }"
      @click="handlePageChange(currentPage - 1)"
    >
      <i class="fa-solid fa-chevron-left" />
    </button>

    <button
      class="pagination__button"
      :class="{ 'pagination__button--active': currentPage === 1 }"
      @click="handlePageChange(1)"
    >
      1
    </button>

    <span v-if="showLeftEllipsis" class="pagination__ellipsis">...</span>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination__button"
      :class="{ 'pagination__button--active': currentPage === page }"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </button>

    <span v-if="showRightEllipsis" class="pagination__ellipsis">...</span>

    <button
      v-if="totalPages > 1"
      class="pagination__button"
      :class="{ 'pagination__button--active': currentPage === totalPages }"
      @click="handlePageChange(totalPages)"
    >
      {{ totalPages }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      class="pagination__button"
      :class="{ 'pagination__button--disabled': currentPage === totalPages }"
      @click="handlePageChange(currentPage + 1)"
    >
      <i class="fa-solid fa-chevron-right" />
    </button>
  </div>
</template>

<style>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.pagination__button {
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.75rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  border-radius: 0.25rem;
  color: #1a202c;
  cursor: pointer;
}

.pagination__button:hover:not(.pagination__button--disabled):not(
    .pagination__button--active
  ) {
  background-color: #f7fafc;
  border-color: #cbd5e0;
}

.pagination__button--active {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}

.pagination__button--disabled {
  background-color: #f7fafc;
  border-color: #e2e8f0;
  color: #a0aec0;
  cursor: not-allowed;
}

.pagination__ellipsis {
  color: #64748b;
  padding: 0 0.25rem;
}

@media (max-width: 640px) {
  .pagination {
    gap: 0.25rem;
  }

  .pagination__button {
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
  }
}
</style>
