<script setup lang="ts">
import { computed, ref } from 'vue';

import FavouriteMoviesList from './components/FavouriteMoviesList.vue';
import MoviesList from './components/MoviesList.vue';
import { UTab } from './components/ui';
import type { Movie } from './models';
import { handleMovieFavouriteToggle } from './utils';

enum TabId {
  Movies = 'movies',
  Favourites = 'favourites',
}
const TAB_OPTIONS = [
  { id: TabId.Movies, label: 'Movies' },
  { id: TabId.Favourites, label: 'Favourites' },
];

const activeTabId = ref<TabId>(TabId.Movies);
const favouriteMovies = ref<Movie[]>([]);

function onToggleFavorite(movie: Movie) {
  handleMovieFavouriteToggle(movie, favouriteMovies);
}

const favouriteMovieIds = computed(() =>
  favouriteMovies.value.map((movie) => movie.imdbID)
);
</script>

<template>
  <div class="container">
    <h1 class="page__title">IBM Movies</h1>

    <UTab v-model="activeTabId" :tabs="TAB_OPTIONS" />

    <MoviesList
      v-show="activeTabId === TabId.Movies"
      :favourite-movie-ids="favouriteMovieIds"
      @toggle-favourites="onToggleFavorite"
    />

    <FavouriteMoviesList
      v-show="activeTabId === TabId.Favourites"
      :favourite-movies="favouriteMovies"
      @toggle-favourites="onToggleFavorite"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
}

.page__title {
  text-align: center;
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
</style>
