import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import Sprite from './sprite';
import Block from './block';
import ISprite from './interfaces/sprite';
import IBlock from './interfaces/block';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';
import ITetrisProps from '../components/tetris/interfaces/tetris-props';

export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public block: IBlock;
	public level: number;
	public direction: DirectionEnum;
	public timer: any;
	public iteration: number;
	public isGameInPlay: boolean;

	readonly height: number = 20;
	readonly width: number = 10;

	constructor(config: ITetrisProps) {
		this.player = new Player(config);
		this.sprites = [];
		this.block = this.newBlock(SpriteTypeEnum.SPRITE01);
		this.level = 1;
		this.direction = DirectionEnum.RIGHT
		this.isGameInPlay = false;
		this.iteration = 1;

		this.createBoard();
		this.hideOrShowBlock(true);
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.ENTER:
			case PlayerResultEnum.SPACE_BAR:
			case PlayerResultEnum.ARROW_RIGHT:
				this.rotateBlock(DirectionEnum.RIGHT); break;
			case PlayerResultEnum.ARROW_LEFT:
				this.rotateBlock(DirectionEnum.LEFT); break;
			case PlayerResultEnum.ARROW_DOWN:
				this.moveBlock(); break;
		}
	}

	public handleTimer = (): void => {
		this.moveBlock();
	}

	private createBoard = (): void => {
		for (let y=1; y <= this.height; y++) {
			for (let x=1; x <= this.width; x++) {
				this.sprites.push(new Sprite({
					key: `sprite-${ x }-${ y }`,
					visable: false,
					x,
					y,
					image: ImageEnum.SPRITE01,
					type: SpriteTypeEnum.SPRITE01,
				}));
			}
		}
	}

	private newBlock = (type: SpriteTypeEnum): IBlock => new Block({
		key: 'player-block',
		x: 5,
		y: 5,
		type,
		containerHeight: this.height
	});

	private hideOrShowBlock = (visable: boolean): void => {
		this.block.matrix.forEach((matrix: number[]) => {
			const sprite = this.sprites.find((spr: ISprite) => spr.x === this.block.x + matrix[0] && spr.y === this.block.y + matrix[1]);

			if (sprite) sprite.visable = visable;
		})
	}

	private rotateBlock = (direction: DirectionEnum): void => {
		this.hideOrShowBlock(false);
		this.block.rotate(direction);
		this.hideOrShowBlock(true);
	}

	private moveBlock = (): void => {
		this.hideOrShowBlock(false);
		const result = this.block.move();
		this.hideOrShowBlock(true);

		this.handleInput(result);
	}
}
