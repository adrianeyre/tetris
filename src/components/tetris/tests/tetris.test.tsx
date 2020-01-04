import React from 'react';
import { shallow } from 'enzyme';

import Tetris from '../tetris';
import ITetrisProps from '../interfaces/tetris-props';

describe('Tetris', () => {
	it('Should render correctly', () => {
		const defaultProps: ITetrisProps = {};
		const tetris = shallow(<Tetris {...defaultProps} />);
		expect(tetris).toMatchSnapshot();
	});
});