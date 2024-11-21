import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import { createApp } from 'vue';

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  },
};

export function setupVueQuery(app: ReturnType<typeof createApp>) {
  app.use(VueQueryPlugin, vueQueryPluginOptions);
}
