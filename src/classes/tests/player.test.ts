import DirectionEnum from '../enums/direction-enum';

import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player({});

		expect(player.key).toEqual('player');
		expect(player.visable).toEqual(true);
		expect(player.x).toEqual(66);
		expect(player.y).toEqual(92);
		expect(player.width).toEqual(10);
		expect(player.height).toEqual(4);
		expect(player.initialPlayerX).toEqual(66);
		expect(player.initialPlayerY).toEqual(92);
		expect(player.xOffset).toEqual(false);
		expect(player.zIndex).toEqual(6000);
		expect(player.direction).toEqual(DirectionEnum.UP);
		expect(player.score).toEqual(0);
		expect(player.lives).toEqual(3);
		expect(player.image).toEqual('player.png');
		expect(player.isAlive).toEqual(true);
	});
});