import { Component } from 'react';

import Game from '../../classes/game';
import PlayerResultEnum from '../../classes/enums/player-result-enum';
import ISprite from '../../classes/interfaces/sprite';
import ITetrisState from './interfaces/tetris-state';
import DrawSprite from '../draw-sprite/draw-sprite';
import InfoBoard from '../info-board/info-board';
import MobileButtons from '../mobile-buttons/mobile-buttons';

import './styles/tetris.scss';

export default class Tetris extends Component<Record<string, never>, ITetrisState> {
	private SPRITE_BLOCKS_WIDTH: number = 20;
	private SPRITE_BLOCKS_HEIGHT: number = 20;
	private container: HTMLDivElement | null = null;

	constructor(props: Record<string, never>) {
		super(props);

		this.state = {
			spriteWidth: 0,
			spriteHeight: 0,
			containerWidth: 800,
			containerHeight: 800,
			containerMargin: 0,
			timerInterval: 0,
			game: new Game(),
		};

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.styleContainer = this.styleContainer.bind(this);
	}

	public override componentDidMount() {
		this.updatePlayerArea();
		window.addEventListener('resize', this.updatePlayerArea);
		window.addEventListener('keydown', this.handleKeyDown);
	}

	public override componentWillUnmount() {
		this.stopTimer();
		window.removeEventListener('resize', this.updatePlayerArea);
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	public override render() {
		return (
			<div
				className="tetris-play-container"
				ref={(d) => {
					this.container = d;
				}}
				style={this.styleContainer()}
			>
				{!this.state.game.isGameInPlay && (
					<InfoBoard
						gameOver={!this.state.game.player.isAlive}
						startGame={this.startGame}
						score={this.state.game.player.score}
						containerHeight={this.state.containerHeight}
					/>
				)}

				{this.state.game.isGameInPlay && (
					<div className="play-area">
						{this.state.game.sprites?.map((sprite: ISprite) => (
							<DrawSprite
								key={sprite.key}
								sprite={sprite}
								height={this.state.spriteHeight}
								width={this.state.spriteWidth}
								containerWidth={this.state.containerWidth}
							/>
						))}

						{this.state.game.board?.map((sprite: ISprite) => (
							<DrawSprite
								key={sprite.key}
								sprite={sprite}
								height={this.state.spriteHeight}
								width={this.state.spriteWidth}
								containerWidth={this.state.containerWidth}
							/>
						))}
					</div>
				)}

				{this.state.game.isGameInPlay && this.state.containerWidth < 600 && (
					<div style={this.styleGameButtons()}>
						<MobileButtons handleMobileButton={this.handleMobileButton} />
					</div>
				)}
			</div>
		);
	}

	private styleContainer = () => ({
		maxWidth: `${this.state.containerHeight}px`,
		marginLeft: `${this.state.containerMargin}px`,
	});

	private styleGameButtons = () => ({
		position: 'absolute' as const,
		width: `100%`,
		maxWidth: `${this.state.containerHeight}px`,
		top: `${(this.state.containerWidth / 100) * 110}px`,
	});

	private startGame = (): void => {
		const game = new Game();
		game.isGameInPlay = true;
		this.startTimer();
		this.setState(() => ({ game }));
		this.updatePlayerArea();
	};

	private updatePlayerArea = (): void => {
		const containerHeight = this.container ? this.container.getBoundingClientRect().height : 0;
		let containerWidth = this.container ? this.container.getBoundingClientRect().width : 0;
		const containerMargin = (window.innerWidth - containerHeight) / 2;
		if (containerWidth > containerHeight) containerWidth = containerHeight;
		const spriteWidth = containerWidth / this.SPRITE_BLOCKS_WIDTH;
		const spriteHeight = ((containerWidth / 100) * 100) / this.SPRITE_BLOCKS_HEIGHT;
		this.setState(() => ({ spriteWidth, spriteHeight, containerWidth, containerHeight, containerMargin }));
	};

	private handleInput = (input: PlayerResultEnum): void => {
		const game = this.state.game;
		game.handleInput(input);

		if (!game.isGameInPlay) this.stopTimer();
		this.setState(() => ({ game }));

		if (this.state.game.timerInterval !== this.state.timerInterval) {
			this.stopTimer();
			this.startTimer();
		}
	};

	private handleKeyDown = (event: KeyboardEvent): void => {
		if (!this.state.game.isGameInPlay) return;

		this.handleInput(event.keyCode);
	};

	private handleMobileButton = (direction: PlayerResultEnum): void => this.handleInput(direction);

	private startTimer = (): void => {
		const timerInterval = this.state.game.timerInterval;
		const timer = setInterval(this.myTimer, this.state.game.timerInterval);

		this.setState(() => ({ timer, timerInterval }));
	};

	private stopTimer = (): void => {
		clearInterval(this.state.timer);

		this.setState(() => ({ timer: undefined }));
	};

	private myTimer = (): void => {
		const game = this.state.game;
		game.handleTimer();

		this.setState(() => ({ game }));
	};
}
