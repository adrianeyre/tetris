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

		const isRotationValidRight = this.isRotationValid(newDirection, sprites);

		if (!isRotationValidRight) return;

		this.direction = newDirection;
		this.matrix = this.updateMatrix(this.direction);
		this.stop = this.updateStop(this.direction);
		this.block = this.updateBlock(this.direction);
	}

	public move = (direction: DirectionEnum, sprites: ISprite[]): PlayerResultEnum => {
		let result = PlayerResultEnum.BLOCK_MOVING;

		if (direction === DirectionEnum.DOWN) result = this.moveDown(sprites);
		if (direction === DirectionEnum.RIGHT || direction === DirectionEnum.LEFT) result = this.moveSidewards(direction, sprites);
		if (result === PlayerResultEnum.BLOCK_STOPPED) return this.isMatrixOutOfBounds();

		return result;
	}

	private moveDown = (sprites: ISprite[]): PlayerResultEnum => {
		let allowMove = true;

		this.stop.forEach((block: number[]) => {
			const sprite = sprites.find((spr: ISprite) => spr.x === this.x + block[0] && spr.y === this.y + block[1]);

			if (sprite && sprite.visable) allowMove = false
			if (this.y + block[1] > this.containerHeight) allowMove = false
		})

		if (allowMove) this.y ++;
		return allowMove ? PlayerResultEnum.BLOCK_MOVING : PlayerResultEnum.BLOCK_STOPPED;
	}

	private moveSidewards = (direction: DirectionEnum, sprites: ISprite[]): PlayerResultEnum => {
		const block = this.block[direction === DirectionEnum.RIGHT ? 0 : 1];
		let result = PlayerResultEnum.BLOCK_MOVING
		
		block.forEach((blockMatix: number[]) => {
			const sprite = sprites.find((spr: ISprite) => spr.x === this.x + blockMatix[0] && spr.y === this.y + blockMatix[1]);

			if (sprite && sprite.visable) result = PlayerResultEnum.BLOCK_STOPPED
			if (this.x + blockMatix[0] > this.containerWidth || this.x + blockMatix[0] < 1) result = PlayerResultEnum.BLOCK_STOPPED
		})

		if (result === PlayerResultEnum.BLOCK_MOVING && direction === DirectionEnum.RIGHT) this.x ++;
		if (result === PlayerResultEnum.BLOCK_MOVING && direction === DirectionEnum.LEFT) this.x --;
		return PlayerResultEnum.BLOCK_MOVING;
	}

	private isMatrixOutOfBounds = (): PlayerResultEnum => {
		let result = PlayerResultEnum.BLOCK_STOPPED;

		this.matrix.forEach((matrix: number[]) => {
			if (this.y + matrix[1] < 1) result = PlayerResultEnum.DEAD;
		})

		return result;
	}

	private isRotationValid = (direction: DirectionEnum, sprites: ISprite[]): boolean => {
		const matrix = this.updateMatrix(direction);
		let allowMove = true;
		
		matrix.forEach((blockMatix: number[]) => {
			const sprite = sprites.find((spr: ISprite) => spr.x === this.x + blockMatix[0] && spr.y === this.y + blockMatix[1]);

			if (sprite && sprite.visable) allowMove = false;
			if (this.x + blockMatix[0] > this.containerWidth || this.x + blockMatix[0] < 1) allowMove = false;
			if (this.y + blockMatix[1] > this.containerHeight) allowMove = false;
		})

		return allowMove;
	}

	private updateMatrix = (direction: DirectionEnum): number[][] => this.matrices.matrix[direction];
	private updateStop = (direction: DirectionEnum): number[][] => this.matrices.stop[direction];
	private updateBlock = (direction: DirectionEnum): number[][][] => this.matrices.block[direction];
}
