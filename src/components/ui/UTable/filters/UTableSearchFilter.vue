<script setup lang="ts">
import { ref, watch } from 'vue';

const search = defineModel<string>({ required: true });
const debouncedSearch = ref(search.value);

let debounceTimer: ReturnType<typeof setTimeout>;
watch(debouncedSearch, (newValue) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    search.value = newValue;
  }, 1000);
});

function handleSearch() {
  search.value = debouncedSearch.value;
}
</script>

<template>
  <form class="search-form" @submit.prevent="handleSearch">
    <i class="fa-solid fa-magnifying-glass search-form__icon" />
    <input
      v-model="debouncedSearch"
      type="search"
      placeholder="Search Movie Title"
      class="search-form__input"
    />
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.search-form__icon {
  color: #64748b;
}

.search-form__input {
  width: 100%;
  padding: 0.25rem;
  font-size: 1rem;
  border: none;
  outline: none;
}
</style>
