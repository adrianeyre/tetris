import IGame from '../../../classes/interfaces/game';

export default interface ITetrisState {
	game: IGame;
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number
	containerHeight: number;
	timer?: any;
}
