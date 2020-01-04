import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import sprite from '../../images/sprite-07.png';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, {}> {
	public render() {
		return <div className="info-board" style={ this.styleInfoBoard() }>
			<div className="info-board-header">
				<img src={ sprite } alt="player" />
				<span className="header-text">Tetris</span>
				<img src={sprite } alt="player" />
			</div>

			{ this.props.gameOver && <div className="game-over-area">
				<div className="game-over-title">Game Over</div>
				<div className="game-over-text">You scored { this.props.score }, better luck next time!</div>
			</div> }

			<div className="info-board-instructions">
				<p>You have to make full horizontal lines with the different shaped blocks that fall into the game area. Full lines will then disappear and provide points. The more lines you make at the same time, the more points you earn.</p>
			</div>

			<div className="button-area">
				<button type="button" onClick={ this.props.startGame }>Play Game</button>
			</div>
		</div>
	}

	private styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})
}
