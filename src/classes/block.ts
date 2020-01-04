import IBlockProps from './interfaces/block-props';
import IBlock from './interfaces/block';
import IMatrices from './interfaces/matrices';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import PlayerResultEnum from './enums/player-result-enum'

import * as matrixData from './data/matrix';

export default class Block implements IBlock {
	public key: string;
	public x: number;
	public y: number;
	public direction: DirectionEnum;
	public type: SpriteTypeEnum;
	public matrices: IMatrices;
	public matrix: number[][];
	public stop: number[][];
	public block: number[][][];
	public containerHeight: number;
	public containerWidth: number;

	constructor(config: IBlockProps) {
		this.key = config.key;
		this.x = config.x;
		this.y = config.y;
		this.direction = DirectionEnum.DOWN;
		this.type = config.type;
		this.containerHeight = config.containerHeight;
		this.containerWidth = config.containerWidth;

		const matrices = matrixData.default.find((block: IMatrices) => block.key === this.type);
		if (!matrices) throw new Error(`No matrix found for: ${ this.key }`)

		this.matrices = matrices;
		this.matrix = this.updateMatrix(this.direction);
		this.stop = this.updateStop(this.direction);
		this.block = this.updateBlock(this.direction);
	}

	public rotate = (direction: DirectionEnum, sprites: ISprite[]): void => {
		let newDirection = this.direction

		if (direction === DirectionEnum.RIGHT) newDirection ++;
		if (direction === DirectionEnum.LEFT) newDirection --;
		if (newDirection > 3) newDirection = 0;
		if (newDirection < 0) newDirection = 3;

		const newBlocks = this.updateBlock(newDirection);
		const isMoveValidRight = this.isMoveValid(sprites, newBlocks[0]);
		const isMoveValidLeft = this.isMoveValid(sprites, newBlocks[1])
		if (isMoveValidRight && isMoveValidLeft) this.direction = newDirection;

		this.matrix = this.updateMatrix(this.direction);
		this.stop = this.updateStop(this.direction);
		this.block = this.updateBlock(this.direction);
	}

	public move = (direction: DirectionEnum, sprites: ISprite[]): PlayerResultEnum => {
		let allowMove = true;

		if (direction === DirectionEnum.DOWN) allowMove = this.moveDown(sprites);
		if (direction === DirectionEnum.RIGHT || direction === DirectionEnum.LEFT) allowMove = this.moveSidewards(direction, sprites);

		return allowMove ? PlayerResultEnum.BLOCK_MOVING : PlayerResultEnum.BLOCK_STOPPED;
	}

	private moveDown = (sprites: ISprite[]): boolean => {
		let allowMove = true;

		this.stop.forEach((block: number[]) => {
			const sprite = sprites.find((spr: ISprite) => spr.x === this.x + block[0] && spr.y === this.y + block[1]);

			if (sprite && sprite.visable) allowMove = false;
			if (this.y + block[1] > this.containerHeight) allowMove = false;
		})

		if (allowMove) this.y ++;
		return allowMove;
	}

	private moveSidewards = (direction: DirectionEnum, sprites: ISprite[]): boolean => {
		const block = this.block[direction === DirectionEnum.RIGHT ? 0 : 1];
		const allowMove = this.isMoveValid(sprites, block);

		if (allowMove && direction === DirectionEnum.RIGHT) this.x ++;
		if (allowMove && direction === DirectionEnum.LEFT) this.x --;
		return true;
	}

	private isMoveValid = (sprites: ISprite[], block: number[][]): boolean => {
		let allowMove = true;
		
		block.forEach((blockMatix: number[]) => {
			const sprite = sprites.find((spr: ISprite) => spr.x === this.x + blockMatix[0] && spr.y === this.y + blockMatix[1]);

			if (sprite && sprite.visable) allowMove = false;
			if (this.x + blockMatix[0] > this.containerWidth || this.x + blockMatix[0] < 1) allowMove = false;
		})

		return allowMove;
	}

	private updateMatrix = (direction: DirectionEnum): number[][] => this.matrices.matrix[direction];
	private updateStop = (direction: DirectionEnum): number[][] => this.matrices.stop[direction];
	private updateBlock = (direction: DirectionEnum): number[][][] => this.matrices.block[direction];
}
