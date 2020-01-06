import { remove } from 'lodash';

import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import Sprite from './sprite';
import Block from './block';
import Counter from './counter';
import ISprite from './interfaces/sprite';
import IBlock from './interfaces/block';
import INextBlock from './interfaces/next-block';
import ICounter from './interfaces/counter';
import PlayerResultEnum from './enums/player-result-enum';
import DirectionEnum from './enums/direction-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';
import ITetrisProps from '../components/tetris/interfaces/tetris-props';

import * as blocksData from './data/blocks';

export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public board: ISprite[];
	public block: IBlock;
	public next: IBlock;
	public level: ICounter;
	public score: ICounter;
	public lines: ICounter;
	public direction: DirectionEnum;
	public timer: any;
	public timerInterval: number;
	public isGameInPlay: boolean;

	readonly DEFAULT_LINE_SCORE: number = 100;
	readonly defaultTimerInterval: number = 1000;
	readonly intervalDecrease: number = 10;
	readonly intervalMinimum: number = 100;
	readonly height: number = 20;
	readonly width: number = 10;
	readonly containerWidth: number = 20;
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
		this.board = [];
		this.level = new Counter({ x: 14, y: 9, value: 1, digits: 4 });
		this.score = new Counter({ x: 12, y: 13, value: 0, digits: 8 });
		this.lines = new Counter({ x: 12, y: 17, value: 0, digits: 8 });
		this.block = this.newBlock(5, 0, DirectionEnum.DOWN, this.randomSprite());
		this.next = this.nextBlock();
		this.direction = DirectionEnum.RIGHT
		this.isGameInPlay = false;
		this.timerInterval = this.defaultTimerInterval;

		this.createSprites();
		this.hideOrShowBlock(true, this.block, this.sprites);
		this.createBoard();
		this.hideOrShowBlock(true, this.next, this.board);
		this.updateCounters();
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

	private createSprites = (): void => {
		for (let y = 1; y <= this.height; y++) {
			for (let x = 1; x <= this.width; x++) {
				this.sprites.push(this.newSprite(x, y));
			}
		}
	}

	private createBoard = (): void => {
		for (let y = 1; y <= this.height; y++) {
			for (let x = this.width + 1; x <= this.containerWidth; x++) {
				this.board.push(this.newSprite(x, y));
			}
		}
	}

	private updateCounters = (): void => {
		this.score.updateValue(this.board);
		this.level.updateValue(this.board);
		this.lines.updateValue(this.board);
	}

	private blockStopped = (): void => {
		this.checkForWinningLines();
		this.createBlock();
		this.createNextBlock();
	}

	private createBlock = (): void => {
		this.block = this.newBlock(5, 0, DirectionEnum.DOWN, this.next.type);
	}

	private createNextBlock = (): void => {
		this.hideOrShowBlock(false, this.next, this.board);
		this.next = this.nextBlock();
		this.hideOrShowBlock(true, this.next, this.board);
	}

	private newSprite = (x: number, y: number): ISprite => new Sprite({
		key: `sprite-${ x }-${ y }`,
		visable: false,
		x,
		y,
		image: ImageEnum.SPRITE01,
		type: SpriteTypeEnum.SPRITE01,
	})

	private newBlock = (x: number, y: number, direction: DirectionEnum, type: SpriteTypeEnum): IBlock => new Block({
		key: 'player-block',
		x,
		y,
		type,
		direction,
		containerHeight: this.height,
		containerWidth: this.width,
	});

	private nextBlock = (): IBlock => {
		const type = this.randomSprite();

		const blockData = blocksData.default.find((block: INextBlock) => block.key === type);
		if (!blockData) throw new Error('No default block data for next block');

		return this.newBlock(blockData.x, blockData.y, blockData.direction, type);
	}

	private hideOrShowBlock = (visable: boolean, block: IBlock, sprites: ISprite[]): void => {
		block.matrix.forEach((matrix: number[]) => {
			const sprite = sprites.find((spr: ISprite) => spr.x === block.x + matrix[0] && spr.y === block.y + matrix[1]);

			if (sprite) {
				if (visable) sprite.show();
				if (!visable) sprite.hide();
				sprite.updateImage(block.type);
			}
		})
	}

	private rotateBlock = (direction: DirectionEnum): void => {
		this.hideOrShowBlock(false, this.block, this.sprites);
		this.block.rotate(direction, this.sprites);
		this.hideOrShowBlock(true, this.block, this.sprites);
	}

	private moveBlock = (direction: DirectionEnum): void => {
		this.hideOrShowBlock(false, this.block, this.sprites);
		const result = this.block.move(direction, this.sprites);
		this.hideOrShowBlock(true, this.block, this.sprites);

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
				this.score.addValue(this.level.value * this.DEFAULT_LINE_SCORE)
				this.level.addValue(1);
				this.lines.addValue(1);
				this.updateCounters();
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
