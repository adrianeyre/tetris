import SpriteTypeEnum from '../enums/sprite-type-enum';
import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import IMatrices from '../interfaces/matrices';
import ISprite from '../interfaces/sprite';

export default interface IBlock {
	key: string;
	x: number;
	y: number;
	direction: DirectionEnum;
	type: SpriteTypeEnum;
	matrices: IMatrices;
	matrix: number[][];
	stop: number[][];
	block: number[][][];
	containerHeight: number;
	containerWidth: number;
	rotate(direction: DirectionEnum, sprites: ISprite[]): void;
	move(direction: DirectionEnum, sprites: ISprite[]): PlayerResultEnum;
}
