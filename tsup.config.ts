import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/fastify-shitty.ts'],
  splitting: false,
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: false,
  tsconfig: './tsconfig.json',
});
