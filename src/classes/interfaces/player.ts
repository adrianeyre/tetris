export default interface IPlayer {
	key: string;
	score: number;
	lives: number;
	isAlive: boolean;
	looseLife(): boolean;
	addScore(extra: number): number
}
