import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/board.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
});
