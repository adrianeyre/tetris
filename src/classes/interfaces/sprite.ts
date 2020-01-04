import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	zIndex: number
	image: string;
	type: SpriteTypeEnum;
	show(): boolean;
	hide(): boolean;
	updateImage(type: SpriteTypeEnum): string;
}
