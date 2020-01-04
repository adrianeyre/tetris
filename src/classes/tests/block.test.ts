import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

import Block from '../block';
import IBlockProps from '../interfaces/block-props';

describe('Block', () => {
	let defaultConfig: IBlockProps

	beforeEach(() => {
		defaultConfig = {
			key: 'sprite',
			x: 10,
			y: 10,
			type: SpriteTypeEnum.SPRITE01,
			containerHeight: 20,
		}
	})

	it('Should create Block class', () => {
		const block = new Block(defaultConfig);

		expect(block.key).toEqual('sprite');
		expect(block.x).toEqual(10);
		expect(block.y).toEqual(10);
		expect(block.direction).toEqual(DirectionEnum.DOWN);
		expect(block.type).toEqual(SpriteTypeEnum.SPRITE01);
	});

	it('Should rotate the block to the right', () => {
		const block = new Block(defaultConfig);

		expect(block.direction).toEqual(DirectionEnum.DOWN);
		block.rotate(DirectionEnum.RIGHT);
		expect(block.direction).toEqual(DirectionEnum.RIGHT);
		block.rotate(DirectionEnum.RIGHT);
		expect(block.direction).toEqual(DirectionEnum.UP);
		block.rotate(DirectionEnum.RIGHT);
		expect(block.direction).toEqual(DirectionEnum.LEFT);
	});

	it('Should rotate the block to the left', () => {
		const block = new Block(defaultConfig);

		expect(block.direction).toEqual(DirectionEnum.DOWN);
		block.rotate(DirectionEnum.LEFT);
		expect(block.direction).toEqual(DirectionEnum.LEFT);
		block.rotate(DirectionEnum.LEFT);
		expect(block.direction).toEqual(DirectionEnum.UP);
		block.rotate(DirectionEnum.LEFT);
		expect(block.direction).toEqual(DirectionEnum.RIGHT);
	});

	it('Should move the block down', () => {
		const block = new Block(defaultConfig);

		expect(block.y).toEqual(10);
		block.move();
		expect(block.y).toEqual(11);
	});
});