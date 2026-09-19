import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The site is published at the root of https://tetris.adrianeyre.co.uk/, so
// asset URLs must be root-relative. A project-page prefix such as `/tetris/`
// here would make the built page ask for /tetris/assets/... and get a 404.
export default defineConfig({
	base: '/',
	plugins: [react()],
	build: {
		outDir: 'dist',
		sourcemap: true,
	},
});
