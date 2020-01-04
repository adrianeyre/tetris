import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Tetris from './components/tetris/tetris';

import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Tetris />, document.getElementById('root'));
serviceWorker.unregister();
