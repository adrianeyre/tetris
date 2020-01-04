import ITetrisProps from '../components/tetris/interfaces/tetris-props';

import IPlayer from './interfaces/player';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';

export default class Player implements IPlayer {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public initialPlayerX: number;
	public initialPlayerY: number;
	public xOffset: boolean;
	public zIndex: number
	public direction: DirectionEnum;
	public score: number;
	public lives: number;
	public image: string;
	public isAlive: boolean;

	readonly X_STEP: number = 1;
	readonly INITIAL_PLAYER_LIVES: number = 3;
	readonly INITIAL_PLAYER_X: number = 66;
	readonly INITIAL_PLAYER_Y: number = 92;
	readonly PLAYER_WIDTH: number = 10;
	readonly PLATER_HEIGHT: number = 4;
	readonly X_OFFSET: boolean = false;
	readonly PLAYER_ZINDEX: number = 6000;
	readonly playerImages: string[] = [];

	constructor(config: ITetrisProps) {
		this.key = 'player';
		this.visable = true;
		this.initialPlayerX = config.initialPlayerX || this.INITIAL_PLAYER_X;
		this.initialPlayerY = config.initialPlayerY || this.INITIAL_PLAYER_Y;
		this.x = this.initialPlayerX;
		this.y = this.initialPlayerY;
		this.width = this.PLAYER_WIDTH;
		this.height = this.PLATER_HEIGHT;
		this.xOffset = this.X_OFFSET;
		this.zIndex = this.PLAYER_ZINDEX;
		this.direction = DirectionEnum.UP;
		this.score = 0;
		this.lives = config.initialPlayerLives || this.INITIAL_PLAYER_LIVES;
		this.image = this.playerImages[this.direction];
		this.isAlive = true;
	}

	public move = (): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE;
	}

	public resetPlayerToStart = () => {
		this.x = this.initialPlayerX;
		this.y = this.initialPlayerY;
	}

	public looseLife = (): boolean => {
		this.lives --;

		return this.lives > 0;
	}

	public addScore = (extra: number): number => this.score += extra;
}
