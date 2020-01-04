import SpriteTypeEnum from '../enums/sprite-type-enum';
import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IBlock {
	key: string;
	x: number;
	y: number;
	direction: DirectionEnum;
	type: SpriteTypeEnum;
	matrices: any;
	matrix: any;
	containerHeight: number;
	rotate(direction: DirectionEnum): void;
	move(): PlayerResultEnum;
}
