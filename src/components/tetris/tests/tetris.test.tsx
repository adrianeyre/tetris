import { render, screen } from '@testing-library/react';

import Tetris from '../tetris';

describe('Tetris', () => {
	it('Should render correctly', () => {
		const { container } = render(<Tetris />);

		expect(container).toMatchSnapshot();
	});

	it('Should show the info board before the game starts', () => {
		render(<Tetris />);

		expect(screen.getByRole('button', { name: 'Play Game' })).toBeInTheDocument();
	});
});
