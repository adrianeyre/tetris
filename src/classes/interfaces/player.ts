import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IPlayer {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	initialPlayerX: number;
	initialPlayerY: number;
	xOffset: boolean;
	zIndex: number
	direction: DirectionEnum;
	score: number;
	lives: number;
	image: string;
	isAlive: boolean;
	move(): PlayerResultEnum;
	resetPlayerToStart(): void;
	looseLife(): boolean;
	addScore(extra: number): number
}
