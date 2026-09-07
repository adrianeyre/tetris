# Tetris Game

#### Technologies: TypeScript, React, SCSS, Vite

## Index

- [Installation and Run](#Install)
- [Scripts](#Scripts)
- [Screen Shots](#Shots)
- [Play Tetris](#Play)

## <a name="Install">Installation and Run</a>

Node 26 or newer is required (see `.nvmrc`).

- To clone the repo and run the game

```shell
$ git clone https://github.com/adrianeyre/tetris
$ cd tetris
$ npm install
$ npm start
```

## <a name="Scripts">Scripts</a>

| Script                      | What it does                                        |
| --------------------------- | --------------------------------------------------- |
| `npm start` / `npm run dev` | Run the game locally with Vite                      |
| `npm run build`             | Typecheck and build the production site into `dist` |
| `npm run preview`           | Serve the production build locally                  |
| `npm test`                  | Run the test suite once with Vitest                 |
| `npm run test:watch`        | Run the tests in watch mode                         |
| `npm run test:coverage`     | Run the tests with a coverage report                |
| `npm run lint`              | Lint with ESLint                                    |
| `npm run typecheck`         | Typecheck with the TypeScript compiler              |
| `npm run format`            | Format the source with Prettier                     |

Every push to `master` runs semantic-release, which decides the next version
from the conventional-commit messages, tags it, publishes the GitHub release
and deploys the built site to GitHub Pages.

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/tetris/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/tetris/master/src/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/tetris/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/tetris/master/src/images/screenshot2.png 'Game View')

## <a name="Play">Play Tetris</a>

- [Tetris](https://adrianeyre.github.io/tetris/)
