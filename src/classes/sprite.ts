import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import sprite01 from '../images/sprite-01.png';
import sprite02 from '../images/sprite-02.png';
import sprite03 from '../images/sprite-03.png';
import sprite04 from '../images/sprite-04.png';
import sprite05 from '../images/sprite-05.png';
import sprite06 from '../images/sprite-06.png';
import sprite07 from '../images/sprite-07.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public zIndex: number;
	public direction: DirectionEnum | undefined;
	public image: string;
	public speed: number | undefined;
	public type: SpriteTypeEnum;

	private imageType: ImageEnum;

	readonly Z_INDEX: number = 5000;
	readonly playerImages = [sprite01, sprite02, sprite03, sprite04, sprite05, sprite06, sprite07];

	constructor(config: ISpriteProps) {
		this.imageType = config.image;
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.zIndex = this.Z_INDEX;
		this.direction = config.direction ? config.direction : undefined;
		this.image = this.playerImages[this.imageType];
		this.type = config.type;
	}

	public move = (): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE;
	}
}
