<script setup lang="ts">
import type { Tab } from './types';

interface Props {
  tabs: Tab[];
}
defineProps<Props>();

const activeTabId = defineModel<string>({ required: true });
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tabs__item', { 'tabs__item--active': activeTabId === tab.id }]"
      @click="activeTabId = tab.id"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #64748b;
  background-color: #f3f4f6;
}
.tabs__item {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.tabs__item--active {
  color: #0f172a;
  background-color: #ffffff;
}
</style>
