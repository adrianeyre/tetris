import ICounter from './interfaces/counter';
import ICounterProps from './interfaces/counter-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';

export default class Counter implements ICounter {
	public x: number;
	public y: number;
	public digits: number;
	public value: number;

	private values: number[];
	private sprites: SpriteTypeEnum[] = [
		SpriteTypeEnum.NUM0,
		SpriteTypeEnum.NUM1,
		SpriteTypeEnum.NUM2,
		SpriteTypeEnum.NUM3,
		SpriteTypeEnum.NUM4,
		SpriteTypeEnum.NUM5,
		SpriteTypeEnum.NUM6,
		SpriteTypeEnum.NUM7,
		SpriteTypeEnum.NUM8,
		SpriteTypeEnum.NUM9,
	]

	constructor(config: ICounterProps) {
		this.x = config.x;
		this.y = config.y;
		this.digits = config.digits;
		this.value = config.value;
		this.values = [];

		this.addValue(0);
	}

	public updateValue = (sprites: ISprite[]): void => {
		let digit = 0;
		for (let x = this.x; x < this.x + this.digits; x++) {
			const sprite = sprites.find((spr: ISprite) => spr.x === x && spr.y === this.y);

			if (sprite) {
				sprite.show();
				sprite.updateImage(this.sprites[this.values[digit]]);
			}

			digit ++;
		}
	}

	public addValue = (value: number): void => {
		this.value += value;
		this.values = [];
		let newValue = this.value;

		for (let x = this.digits; x > 0; x--) {
			const tenth = 10 ** (x - 1)
			const result = Math.floor(newValue / tenth);
			this.values.push(result);
			newValue -= result * tenth;
		}
	}
}