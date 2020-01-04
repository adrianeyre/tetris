import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface IBlockProps {
	key: string;
	x: number;
	y: number;
	type: SpriteTypeEnum;
	containerHeight: number;
	containerWidth: number;
}
