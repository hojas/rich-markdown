import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts', 'src/theme/default.css', 'src/theme/dark.css', 'src/theme/light.css'],
  target: 'node16',
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
})
