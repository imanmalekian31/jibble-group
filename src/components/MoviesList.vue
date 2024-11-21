<script setup lang="ts">
import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { computed, ref, watch } from 'vue';

import { getMoviesListAPI } from '../apis';
import type { Movie } from '../models';
import { UPagination, UTable, UTableSearchFilter } from './ui';

interface Props {
  favouriteMovieIds: string[];
}
defineProps<Props>();
const emit = defineEmits<{
  (e: 'toggle-favourites', movie: Movie): void;
}>();

const search = ref('');
const page = ref(1);

const columns = [
  { key: 'imdbID', label: 'ID' },
  { key: 'Title', label: 'Title' },
  { key: 'Year', label: 'Year' },
  { key: 'actions', label: '' },
];

watch(search, () => {
  page.value = 1;
});

const { data, isFetching } = useQuery({
  queryKey: ['movies', { page: page, search: search }],
  queryFn: () => getMoviesListAPI(page.value, search.value || undefined),
  placeholderData: keepPreviousData,
});

const moviesList = computed(() => data.value?.data?.data || []);
const totalPages = computed(() => data.value?.data?.total_pages || 0);
</script>

<template>
  <div class="movies-list">
    <UTableSearchFilter v-model="search" />
    <UTable :columns="columns" :rows="moviesList" :is-loading="isFetching">
      <template #actions-data="{ row }">
        <i
          :class="[
            favouriteMovieIds.includes(row.imdbID) ? 'fa-solid' : 'fa-regular',
            'fa-star favourite-btn',
          ]"
          @click="emit('toggle-favourites', row)"
        />
      </template>
    </UTable>
    <UPagination v-model="page" :total-pages="totalPages" />
  </div>
</template>

<style scoped>
.movies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.favourite-btn {
  cursor: pointer;
  color: #f59e0b;
}
</style>
