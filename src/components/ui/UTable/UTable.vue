<script setup lang="ts">
import type { Column } from './types';

interface Props<T> {
  columns: Column[];
  rows: T[];
  isLoading?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<Props<any>>();
</script>

<template>
  <div class="table">
    <table class="table__main">
      <thead class="table__header">
        <tr class="table__row table__row--header">
          <th
            v-for="column in columns"
            :key="column.key"
            class="table__cell table__cell--header"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <template v-if="isLoading">
          <tr
            v-for="loadingIdx in 10"
            :key="loadingIdx"
            class="table__row table__row--loading"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="table__cell table__cell--loading"
            >
              <div class="loading-placeholder" />
            </td>
          </tr>
        </template>
        <tr
          v-for="(row, rowIdx) in rows"
          v-else-if="!isLoading && !!rows.length"
          :key="rowIdx"
          class="table__row table__row--body"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="table__cell table__cell--body"
          >
            <slot :name="`${column.key}-data`" :row="row" :column="column">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
        <tr v-else class="table__row table__row--empty">
          <td :colspan="columns.length" class="table__cell table__cell--empty">
            We couldn't find any matching records!
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.table__main {
  width: 100%;
  border-collapse: collapse;
}

.table__header {
  background-color: #f9fafb;
}

.table__row--header {
  border-bottom: 1px solid #e5e7eb;
}

.table__cell {
  padding: 1rem 0.75rem;
}

.table__cell--header {
  font-weight: bold;
  text-align: left;
}

.table__body .table__row--body + .table__row--body {
  border-top: 1px solid #e5e7eb;
}

.table__row--body:hover {
  background-color: #f1f1f1;
}

.table__row--loading .table__cell--loading {
  padding: 1rem 0.75rem;
}

.loading-placeholder {
  height: 1rem;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
}

.table__cell--empty {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-style: italic;
}
</style>
