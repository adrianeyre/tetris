import { remove } from 'lodash';

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
	public next: IBlock;
	public level: number;
	public direction: DirectionEnum;
	public timer: any;
	public timerInterval: number;
	public isGameInPlay: boolean;

	readonly defaultTimerInterval: number = 1000;
	readonly intervalDecrease: number = 10;
	readonly intervalMinimum: number = 100;
	readonly height: number = 20;
	readonly width: number = 10;
	readonly spriteTypes: SpriteTypeEnum[] = [
		SpriteTypeEnum.SPRITE01,
		SpriteTypeEnum.SPRITE02,
		SpriteTypeEnum.SPRITE03,
		SpriteTypeEnum.SPRITE04,
		SpriteTypeEnum.SPRITE05,
		SpriteTypeEnum.SPRITE06,
		SpriteTypeEnum.SPRITE07,
	];

	constructor(config: ITetrisProps) {
		this.player = new Player(config);
		this.sprites = [];
		this.block = this.newBlock(this.randomSprite());
		this.next = this.newBlock(this.randomSprite());
		this.level = 1;
		this.direction = DirectionEnum.RIGHT
		this.isGameInPlay = false;
		this.timerInterval = this.defaultTimerInterval;

		this.createBoard();
		this.hideOrShowBlock(true);
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.BLOCK_STOPPED:
				this.blockStopped(); break;
			case PlayerResultEnum.DEAD:
				this.lose(); break;
			case PlayerResultEnum.ENTER:
			case PlayerResultEnum.SPACE_BAR:
				this.rotateBlock(DirectionEnum.RIGHT); break;
			case PlayerResultEnum.ARROW_RIGHT:
				this.moveBlock(DirectionEnum.RIGHT); break;
			case PlayerResultEnum.ARROW_LEFT:
				this.moveBlock(DirectionEnum.LEFT); break;
			case PlayerResultEnum.ARROW_DOWN:
				this.moveBlock(DirectionEnum.DOWN); break;
		}
	}

	public handleTimer = (): void => {
		this.moveBlock(DirectionEnum.DOWN);
	}

	private createBoard = (): void => {
		for (let y=1; y <= this.height; y++) {
			for (let x=1; x <= this.width; x++) {
				this.sprites.push(this.newSprite(x, y));
			}
		}
	}

	private blockStopped = () => {
		this.checkForWinningLines();
		this.createBlock();
	}

	private createBlock = () => {
		this.block = this.newBlock(this.randomSprite());
	}

	private newSprite = (x: number, y: number): ISprite => new Sprite({
		key: `sprite-${ x }-${ y }`,
		visable: false,
		x,
		y,
		image: ImageEnum.SPRITE01,
		type: SpriteTypeEnum.SPRITE01,
	})

	private newBlock = (type: SpriteTypeEnum): IBlock => new Block({
		key: 'player-block',
		x: 5,
		y: 0,
		type,
		containerHeight: this.height,
		containerWidth: this.width,
	});

	private hideOrShowBlock = (visable: boolean): void => {
		this.block.matrix.forEach((matrix: number[]) => {
			const sprite = this.sprites.find((spr: ISprite) => spr.x === this.block.x + matrix[0] && spr.y === this.block.y + matrix[1]);

			if (sprite) {
				if (visable) sprite.show();
				if (!visable) sprite.hide();
				sprite.updateImage(this.block.type);
			}
		})
	}

	private rotateBlock = (direction: DirectionEnum): void => {
		this.hideOrShowBlock(false);
		this.block.rotate(direction, this.sprites);
		this.hideOrShowBlock(true);
	}

	private moveBlock = (direction: DirectionEnum): void => {
		this.hideOrShowBlock(false);
		const result = this.block.move(direction, this.sprites);
		this.hideOrShowBlock(true);

		this.handleInput(result);
	}

	private checkForWinningLines = () => {
		for (let y = this.height; y > 0; y--) {
			const blocks = this.sprites.filter((sprite: ISprite) => sprite.visable && sprite.y === y);

			if (blocks.length === this.width) {
				this.removeLine(y);
				this.moveLines(y);
				this.addLine();
				this.decreaseTimer();
				y++;
			}
		}
	}

	private removeLine = (line: number): void => {
		const blocks = this.sprites.filter((sprite: ISprite) => sprite.y === line);
		blocks.forEach((sprite: ISprite) => remove(this.sprites, { key: sprite.key }));
	}

	private moveLines = (line: number): void => {
		for (let y = line - 1; y > 0; y--) {
			const blocks = this.sprites.filter((sprite: ISprite) => sprite.y === y);
			blocks.forEach((sprite: ISprite) => {
				sprite.y ++;
				sprite.key = `sprite-${ sprite.x }-${ sprite.y }`;
			});
		}
	}

	private addLine = (): void => {
		for (let x=1; x <= this.width; x++) {
			this.sprites.push(this.newSprite(x, 1));
		}
	}

	private lose = () => {
		this.player.looseLife();
		this.isGameInPlay = false;
	}

	private decreaseTimer = () => {
		this.timerInterval -= this.intervalDecrease;
		if (this.timerInterval < this.intervalMinimum) this.timerInterval = this.intervalMinimum;
	}

	private randomSprite = (): SpriteTypeEnum => this.spriteTypes[Math.floor(Math.random() * this.spriteTypes.length)];
}
