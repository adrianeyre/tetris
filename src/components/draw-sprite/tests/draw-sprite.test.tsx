import React from 'react';
import { shallow } from 'enzyme';

import DrawSprite from '../draw-sprite';
import IDrawSpriteProps from '../interfaces/draw-sprite-props';
import Sprite from '../../../classes/sprite';
import SpriteTypeEnum from '../../../classes/enums/sprite-type-enum';
import ImageEnum from '../../../classes/enums/image-enum';

describe('Draw Sprite', () => {
	it('Should render correctly', () => {
		const defaultProps: IDrawSpriteProps = {
			sprite: new Sprite({
				key: 'key',
				visable: true,
				x: 10,
				y: 10,
				image: ImageEnum.SPRITE01,
				type: SpriteTypeEnum.SPRITE01,
			}),
			height: 10,
			width: 10,
			containerWidth: 10,
		};

		const drawFish = shallow(<DrawSprite {...defaultProps} />);
		expect(drawFish).toMatchSnapshot();
	});
});