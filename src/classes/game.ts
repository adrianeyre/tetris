import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import Sprite from './sprite';
import ISprite from './interfaces/sprite';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';
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
		this.sprites = [
			new Sprite({
				key: 'sprite-01',
				visable: true,
				x: 14,
				y: 3,
				direction: DirectionEnum.DOWN,
				image: ImageEnum.SPRITE01,
				type: SpriteTypeEnum.SPRITE01,
			}),
			new Sprite({
				key: 'sprite-02',
				visable: true,
				x: 15,
				y: 3,
				direction: DirectionEnum.DOWN,
				image: ImageEnum.SPRITE01,
				type: SpriteTypeEnum.SPRITE01,
			}),
			new Sprite({
				key: 'sprite-03',
				visable: true,
				x: 16,
				y: 3,
				direction: DirectionEnum.DOWN,
				image: ImageEnum.SPRITE01,
				type: SpriteTypeEnum.SPRITE01,
			}),
			new Sprite({
				key: 'sprite-04',
				visable: true,
				x: 17,
				y: 3,
				direction: DirectionEnum.DOWN,
				image: ImageEnum.SPRITE01,
				type: SpriteTypeEnum.SPRITE01,
			}),
		];
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
