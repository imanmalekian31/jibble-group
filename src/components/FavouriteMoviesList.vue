<script setup lang="ts">
import { computed, ref } from 'vue';

import type { Movie } from '../models';
import { UPagination, UTable, UTableSearchFilter } from './ui';

interface Props {
  favouriteMovies: Movie[];
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'toggle-favourites', movie: Movie): void;
}>();

const search = ref('');
const page = ref(1);
const itemsPerPage = 10;

const columns = [
  { key: 'imdbID', label: 'ID' },
  { key: 'Title', label: 'Title' },
  { key: 'Year', label: 'Year' },
  { key: 'actions', label: '' },
];

const paginatedMovies = computed(() => {
  const filteredMovies = props.favouriteMovies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.value.toLowerCase())
  );
  const start = (page.value - 1) * itemsPerPage;
  return filteredMovies.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  const filteredMovies = props.favouriteMovies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.value.toLowerCase())
  );
  return Math.ceil(filteredMovies.length / itemsPerPage);
});
</script>

<template>
  <div class="movies-list">
    <UTableSearchFilter v-model="search" />
    <UTable :columns="columns" :rows="paginatedMovies">
      <template #actions-data="{ row }">
        <i
          class="fa-solid fa-trash remove-btn"
          @click="emit('toggle-favourites', row)"
        />
      </template>
    </UTable>
    <UPagination
      v-if="favouriteMovies.length > 10"
      v-model="page"
      :total-pages="totalPages"
    />
  </div>
</template>

<style scoped>
.movies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.remove-btn {
  cursor: pointer;
  color: #dc2626;
}
</style>
