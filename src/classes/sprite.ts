import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public xStep: number;
	public yStep: number;
	public xOffset: boolean;
	public score: number;
	public movable: boolean;
	public zIndex: number;
	public direction: DirectionEnum | undefined;
	public image: ImageEnum;
	public speed: number | undefined;
	public type: SpriteTypeEnum;

	private imageOn: boolean;
	private imageType: string;

	readonly X_OFFSET: boolean = false;
	readonly Z_INDEX: number = 5000;
	readonly X_STEP: number = 5;
	readonly Y_STEP: number = 2;
	readonly playerImages = {}

	constructor(config: ISpriteProps) {
		this.imageOn = true;
		this.imageType = config.image;
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.xStep = this.X_STEP;
		this.yStep = this.Y_STEP;
		this.movable = config.movable ? config.movable : false;
		this.xOffset = config.xOffset ? config.xOffset : this.X_OFFSET;
		this.zIndex = this.Z_INDEX;
		this.score = config.score ? config.score : 0;
		this.direction = config.direction ? config.direction : undefined;
		this.image = this.playerImages[this.imageType][this.imageOn ? 0 : 1];
		this.type = config.type;
	}

	public move = (): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE;
	}
}
