import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/setup-tests.ts'],
		include: ['src/**/*.{test,spec}.{ts,tsx}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/interfaces/**', 'src/**/enums/**'],
		},
	},
});
