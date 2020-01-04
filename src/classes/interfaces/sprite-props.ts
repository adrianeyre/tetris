import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';
import ImageEnum from '../enums/image-enum';

export default interface ISpriteProps {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	direction?: DirectionEnum;
	image: ImageEnum;
	type: SpriteTypeEnum;
}
