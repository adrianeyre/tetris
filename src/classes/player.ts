import ITetrisProps from '../components/tetris/interfaces/tetris-props';

import IPlayer from './interfaces/player';

export default class Player implements IPlayer {
	public key: string;
	public score: number;
	public isAlive: boolean;

	readonly INITIAL_PLAYER_LIVES: number = 3;

	constructor(config: ITetrisProps) {
		this.key = 'player';
		this.score = 0;
		this.isAlive = true;
	}

	public looseLife = (): boolean => this.isAlive = false;
	public addScore = (extra: number): number => this.score += extra;
}
