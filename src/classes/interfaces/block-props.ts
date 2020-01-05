import SpriteTypeEnum from '../enums/sprite-type-enum';
import DirectEnum from '../enums/direction-enum';

export default interface IBlockProps {
	key: string;
	x: number;
	y: number;
	type: SpriteTypeEnum;
	direction: DirectEnum;
	containerHeight: number;
	containerWidth: number;
}
