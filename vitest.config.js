import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov', 'clover'],
      include: ['docs/**/*.js'],
      exclude: ['docs/sw.js'],
    },
  },
});
