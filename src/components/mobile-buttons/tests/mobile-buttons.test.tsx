import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MobileButtons from '../mobile-buttons';
import IMobileButtonsProps from '../interfaces/mobile-buttons-props';
import PlayerResultEnum from '../../../classes/enums/player-result-enum';

describe('Mobile Buttons', () => {
	it('Should render correctly', () => {
		const defaultProps: IMobileButtonsProps = {
			handleMobileButton: vi.fn(),
		};

		const { container } = render(<MobileButtons {...defaultProps} />);

		expect(container).toMatchSnapshot();
	});

	it('Should report the direction of the button pressed', async () => {
		const handleMobileButton = vi.fn();
		render(<MobileButtons handleMobileButton={handleMobileButton} />);

		await userEvent.click(screen.getByRole('button', { name: 'LEFT' }));

		expect(handleMobileButton).toHaveBeenCalledWith(PlayerResultEnum.ARROW_LEFT);
	});
});
