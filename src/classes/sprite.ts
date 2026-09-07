import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import sprite01 from '../images/sprite-01.png';
import sprite02 from '../images/sprite-02.png';
import sprite03 from '../images/sprite-03.png';
import sprite04 from '../images/sprite-04.png';
import sprite05 from '../images/sprite-05.png';
import sprite06 from '../images/sprite-06.png';
import sprite07 from '../images/sprite-07.png';
import num0 from '../images/0.png';
import num1 from '../images/1.png';
import num2 from '../images/2.png';
import num3 from '../images/3.png';
import num4 from '../images/4.png';
import num5 from '../images/5.png';
import num6 from '../images/6.png';
import num7 from '../images/7.png';
import num8 from '../images/8.png';
import num9 from '../images/9.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public zIndex: number;
	public image: string;
	public type: SpriteTypeEnum;

	readonly Z_INDEX: number = 5000;

	// Keyed by the enum rather than by bare identifiers, so TypeScript checks
	// that every sprite type has a picture instead of quietly handing back
	// `undefined` for one that does not.
	readonly playerImages: Record<SpriteTypeEnum, string> = {
		[SpriteTypeEnum.SPRITE01]: sprite01,
		[SpriteTypeEnum.SPRITE02]: sprite02,
		[SpriteTypeEnum.SPRITE03]: sprite03,
		[SpriteTypeEnum.SPRITE04]: sprite04,
		[SpriteTypeEnum.SPRITE05]: sprite05,
		[SpriteTypeEnum.SPRITE06]: sprite06,
		[SpriteTypeEnum.SPRITE07]: sprite07,
		[SpriteTypeEnum.NUM0]: num0,
		[SpriteTypeEnum.NUM1]: num1,
		[SpriteTypeEnum.NUM2]: num2,
		[SpriteTypeEnum.NUM3]: num3,
		[SpriteTypeEnum.NUM4]: num4,
		[SpriteTypeEnum.NUM5]: num5,
		[SpriteTypeEnum.NUM6]: num6,
		[SpriteTypeEnum.NUM7]: num7,
		[SpriteTypeEnum.NUM8]: num8,
		[SpriteTypeEnum.NUM9]: num9,
	};

	// ImageEnum is the numeric picture slot a sprite is created with; this is
	// the bridge from that slot to the sprite type the images are keyed by.
	readonly imageTypes: Record<ImageEnum, SpriteTypeEnum> = {
		[ImageEnum.SPRITE01]: SpriteTypeEnum.SPRITE01,
		[ImageEnum.SPRITE02]: SpriteTypeEnum.SPRITE02,
		[ImageEnum.SPRITE03]: SpriteTypeEnum.SPRITE03,
		[ImageEnum.SPRITE04]: SpriteTypeEnum.SPRITE04,
		[ImageEnum.SPRITE05]: SpriteTypeEnum.SPRITE05,
		[ImageEnum.SPRITE06]: SpriteTypeEnum.SPRITE06,
		[ImageEnum.SPRITE07]: SpriteTypeEnum.SPRITE07,
	};

	constructor(config: ISpriteProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.zIndex = this.Z_INDEX;
		this.image = this.playerImages[this.imageTypes[config.image]];
		this.type = config.type;
	}

	public show = (): boolean => (this.visable = true);
	public hide = (): boolean => (this.visable = false);
	public updateImage = (type: SpriteTypeEnum): string => (this.image = this.playerImages[type]);
}
