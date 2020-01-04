import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	zIndex: number
	direction: DirectionEnum | undefined;
	image: string;
	type: SpriteTypeEnum;
	move(): PlayerResultEnum;
}
