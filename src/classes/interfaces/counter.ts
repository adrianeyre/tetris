import ISprite from './sprite';

export default interface ICounter {
	x: number;
	y: number;
	digits: number;
	value: number;
	updateValue(sprites: ISprite[]): void;
	addValue(value: number): void;
}
