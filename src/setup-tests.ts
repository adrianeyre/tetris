import '@testing-library/jest-dom/vitest';

// jsdom has no layout engine and no matchMedia; the game asks for both while
// it works out how big a sprite should be. Neither answer matters to the
// assertions, only that the calls do not throw.
window.matchMedia =
	window.matchMedia ||
	((query: string) =>
		({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}) as MediaQueryList);
