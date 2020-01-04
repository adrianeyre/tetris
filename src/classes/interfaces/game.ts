import IPlayer from './player';
import ISprite from './sprite';
import PlayerResultEnum from '../enums/player-result-enum';
import DirectionEnum from '../enums/direction-enum';

export default interface IGame {
	player: IPlayer;
	sprites?: ISprite[];
	level: number;
	direction: DirectionEnum;
	timer: any;
	iteration: number;
	isGameInPlay: boolean;
	handleInput(playerResult: PlayerResultEnum): void;
	handleTimer(): void;
}
