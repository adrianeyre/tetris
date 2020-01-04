import IBlockProps from './interfaces/block-props';
import IBlock from './interfaces/block';
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
	public matrices: any;
	public matrix: any;
	public containerHeight: number;

	constructor(config: IBlockProps) {
		this.key = config.key;
		this.x = config.x;
		this.y = config.y;
		this.direction = DirectionEnum.DOWN;
		this.type = config.type;
		this.containerHeight = config.containerHeight;

		const matrices = matrixData.default.find((block: any) => block.key === this.type);
		if (!matrices) throw new Error(`No matrix found for: ${ this.key }`)
		this.matrices = matrices.matrix;
		this.matrix = this.updateMatrix(this.direction);
	}

	public rotate = (direction: DirectionEnum): void => {
		if (direction === DirectionEnum.RIGHT) this.direction ++;
		if (direction === DirectionEnum.LEFT) this.direction --;
		if (this.direction > 3) this.direction = 0;
		if (this.direction < 0) this.direction = 3;

		this.matrix = this.updateMatrix(this.direction)
	}

	public move = (): PlayerResultEnum => {
		if (this.y + 1 < this.containerHeight) this.y ++;

		return PlayerResultEnum.NO_MOVE;
	}

	private updateMatrix = (direction: DirectionEnum): number[] => this.matrices[direction];
}
