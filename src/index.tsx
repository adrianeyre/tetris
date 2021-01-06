import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Tetris from './components/tetris/tetris';

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Tetris />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
