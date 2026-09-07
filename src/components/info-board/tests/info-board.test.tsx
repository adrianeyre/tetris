import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InfoBoard from '../info-board';
import IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
	const defaultProps = (): IInfoBoardProps => ({
		gameOver: true,
		score: 1000,
		containerHeight: 1000,
		startGame: vi.fn(),
	});

	it('Should render correctly', () => {
		const { container } = render(<InfoBoard {...defaultProps()} />);

		expect(container).toMatchSnapshot();
	});

	it('Should start the game when the button is clicked', async () => {
		const props = defaultProps();
		render(<InfoBoard {...props} />);

		await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

		expect(props.startGame).toHaveBeenCalledTimes(1);
	});
});
