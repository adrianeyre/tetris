import { render } from '@testing-library/react';

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

		const { container } = render(<DrawSprite {...defaultProps} />);

		expect(container).toMatchSnapshot();
	});

	it('Should render nothing for a hidden sprite', () => {
		const sprite = new Sprite({
			key: 'key',
			visable: false,
			x: 10,
			y: 10,
			image: ImageEnum.SPRITE01,
			type: SpriteTypeEnum.SPRITE01,
		});

		const { container } = render(<DrawSprite sprite={sprite} height={10} width={10} containerWidth={10} />);

		expect(container.querySelector('img')).toBeNull();
	});
});
