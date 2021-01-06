import React, { FC } from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import sprite from '../../images/sprite-07.png';

import './styles/info-board.scss';

const InfoBoard: FC<IInfoBoardProps> = (props: IInfoBoardProps) => {
	const styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ props.containerHeight }px`,
	})

	return <div className="info-board" style={ styleInfoBoard() }>
		<div className="info-board-header">
			<img src={ sprite } alt="player" />
			<span className="header-text">Tetris</span>
			<img src={sprite } alt="player" />
		</div>

		{ props.gameOver && <div className="game-over-area">
			<div className="game-over-title">Game Over</div>
			<div className="game-over-text">You scored { props.score }, better luck next time!</div>
		</div> }

		<div className="info-board-instructions">
			<p>You have to make full horizontal lines with the different shaped blocks that fall into the game area. Full lines will then disappear and provide points. The more lines you make at the same time, the more points you earn.</p>
		</div>

		<div className="button-area">
			<button type="button" onClick={ props.startGame }>Play Game</button>
		</div>
	</div>
}

export default InfoBoard;
