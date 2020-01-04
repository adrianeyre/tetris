import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';
import ImageEnum from '../enums/image-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	xOffset: boolean;
	width: number;
	height: number;
	score: number;
	xStep: number;
	yStep: number;
	zIndex: number
	direction: DirectionEnum | undefined;
	image: ImageEnum;
	speed: number | undefined;
	type: SpriteTypeEnum;
	move(): PlayerResultEnum;
}
