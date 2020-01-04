import IPlayer from './player';
import ISprite from './sprite';
import IBlock from './block';
import PlayerResultEnum from '../enums/player-result-enum';
import DirectionEnum from '../enums/direction-enum';

export default interface IGame {
	player: IPlayer;
	sprites?: ISprite[];
	block: IBlock;
	level: number;
	direction: DirectionEnum;
	timer: any;
	iteration: number;
	isGameInPlay: boolean;
	handleInput(playerResult: PlayerResultEnum): void;
	handleTimer(): void;
}
