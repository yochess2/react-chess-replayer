import React from 'react'

class GameList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			games: [
				{
					id: 101,
					fen: "rnbqk2r/pppp1Qpp/5n2/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4",
					history: ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5', 'Nc6', 'Qxf7'],
					white: {
						name: "Drake W",
						rating: 1054,
					},
					black: {
						name: "Alex S",
						rating: 950,
					},
				},
				{
					id: 102,
					fen: "rnbqk2r/pppp1ppp/5n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
					history: ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5', 'Nc6'],
					white: {
						name: "Charles W",
						rating: 1400
					},
					black: {
						name: "Lanisa W",
						rating: 450,
					},
				},
				{
					id: 103,
					fen: "rnbqk1nr/pppp1ppp/8/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3",
					history: ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5'],
					white: {
						name: "GM Karpov",
						rating: 2650,
					},
					black: {
						name: "GM Kasparov",
						rating: 2800,
					},
				},
			],
		}
	}

	componentDidMount() {
		console.log('    Game List - ComponentDidMount')
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log('    Game List - ComponentDidUpdate', prevState, this.state)
		console.log('    Game List - ComponentDidUpdate')
	}

	componentWillUnmount(prevProps, prevState) {
		console.log('    Game List - ComponentWillUnmount')
	}

	componentDidCatch(error, info) {
		console.log('    Game List - ComponentDidCatch')
	}


	render() {
		console.log('    Game List - render')
		return (
			<>
				{this.state.games.map((game, index) => {
					return (
						<div 
							key={index}>
							<h4>
							<span 
								className="hand-icon"
								onClick={(event) => { this.onGameClick(event, index) }}>
								Game {game.id} - {game.white.name} ({game.white.rating}) vs. {game.black.name} ({game.black.rating})
							</span>
							</h4>
						</div>
					)
				})}
			</>
		)
	}

	onGameClick = (event, index) => {
		let game = this.state.games[index]
		this.props.onGameClick(game)
	}
}

export default GameList