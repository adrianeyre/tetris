import ITetrisProps from '../components/tetris/interfaces/tetris-props';

import IPlayer from './interfaces/player';

export default class Player implements IPlayer {
	public key: string;
	public score: number;
	public lives: number;
	public isAlive: boolean;

	readonly INITIAL_PLAYER_LIVES: number = 3;

	constructor(config: ITetrisProps) {
		this.key = 'player';
		this.score = 0;
		this.lives = config.initialPlayerLives || this.INITIAL_PLAYER_LIVES;
		this.isAlive = true;
	}

	public looseLife = (): boolean => {
		this.lives --;

		return this.lives > 0;
	}

	public addScore = (extra: number): number => this.score += extra;
}
