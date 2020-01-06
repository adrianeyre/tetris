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

	private imageType: ImageEnum;

	readonly Z_INDEX: number = 5000;
	readonly playerImages = {sprite01, sprite02, sprite03, sprite04, sprite05, sprite06, sprite07, num0, num1, num2, num3, num4, num5, num6, num7, num8, num9};

	constructor(config: ISpriteProps) {
		this.imageType = config.image;
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.zIndex = this.Z_INDEX;
		this.image = this.playerImages[this.imageType];
		this.type = config.type;
	}

	public show = (): boolean => this.visable = true;
	public hide = (): boolean => this.visable = false;
	public updateImage = (type: SpriteTypeEnum): string => this.image = this.playerImages[type];
}
