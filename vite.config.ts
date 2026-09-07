import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The site is published to https://adrianeyre.github.io/tetris/, so every asset
// URL has to carry that prefix. `base` is what puts it there; without it the
// built page asks the org root for /assets/... and gets a 404.
export default defineConfig({
	base: '/tetris/',
	plugins: [react()],
	build: {
		outDir: 'dist',
		sourcemap: true,
	},
});
