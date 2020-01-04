import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import ITetrisProps from '../components/tetris/interfaces/tetris-props';


export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public level: number;
	public direction: DirectionEnum;
	public timer: any;
	public iteration: number;
	public isGameInPlay: boolean;

	constructor(config: ITetrisProps) {
		this.player = new Player(config);
		this.sprites = [];
		this.level = 1;
		this.direction = DirectionEnum.RIGHT
		this.isGameInPlay = false;
		this.iteration = 1;
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		
	}

	public handleTimer = (): void => {
		
	}
}
