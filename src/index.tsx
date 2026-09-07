import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Tetris from './components/tetris/tetris';

import './index.scss';

const container = document.getElementById('root');
if (!container) throw new Error('No #root element to mount the game into');

createRoot(container).render(
	<StrictMode>
		<Tetris />
	</StrictMode>,
);
