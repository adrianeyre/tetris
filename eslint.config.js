import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'coverage', 'node_modules', 'src/**/__snapshots__'] },
	js.configs.recommended,
	tseslint.configs.recommended,
	reactHooks.configs.flat['recommended-latest'],
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			// TypeScript already resolves every identifier, and it knows about the
			// DOM lib; `no-undef` only duplicates that badly on .ts files.
			'no-undef': 'off',
		},
	},
);
