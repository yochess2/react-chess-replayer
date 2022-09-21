import React from 'react'
import ChessWebAPI from 'chess-web-api'


class GameList extends React.Component {
	constructor(props) {
		// console.log('Game List - constructor')
		super(props)
		this.state = {
			api: new ChessWebAPI(),
			chesscomGames: [],
			games: [
				{
					id: 101,
					fen: "rnbqk2r/pppp1Qpp/5n2/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4",
					history: ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5', 'Nf6', 'Qxf7'],
					white: {
						username: null,
						name: "Drake W",
						rating: 1054,
					},
					black: {
						username: null,
						name: "Alex S",
						rating: 950,
					},
				},
				{
					id: 102,
					fen: "rnbqk2r/pppp1ppp/5n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
					history: ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5', 'Nf6'],
					white: {
						username: null,
						name: "Charles W",
						rating: 1400
					},
					black: {
						username: null,
						name: "Lanisa W",
						rating: 450,
					},
				},
				{
					id: 103,
					fen: "rnbqk1nr/pppp1ppp/8/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3",
					history: ['e4', 'e5', 'Bc4', 'Bc5', 'Qh5'],
					white: {
						username: null,
						name: "GM Karpov",
						rating: 2650,
					},
					black: {
						username: null,
						name: "GM Kasparov",
						rating: 2800,
					},
				},
			],
		}
	}

	componentDidMount() {
		console.log('    Game List - ComponentDidMount')
		this.state.api
			.getPlayerCompleteMonthlyArchives('tiger415', 2022, 9)
			.then((res) => {
				console.log('        success!', res.body.games[0])
				this.setState({ chesscomGames: res.body.games })
			})
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log('    Game List - ComponentDidUpdate', prevState, this.state)
		// console.log('    Game List - ComponentDidUpdate')
	}

	componentWillUnmount(prevProps, prevState) {
		console.log('    Game List - ComponentWillUnmount')
	}

	componentDidCatch(error, info) {
		console.log('    Game List - ComponentDidCatch')
	}


	render() {
		// console.log('    Game List - render')
		return (
			<div style={{ height: '520px', overflow: 'auto' }}>
				{this.state.chesscomGames.slice().reverse().map((game, index) => {
					return (
						<div 
							key={index}>
							<h4>
							<span 
								className="hand-icon"
								onClick={(event) => { this.onGameClick(event, index) }}>
								Game {index+1} - {game.white.name || game.white.username} ({game.white.rating}) 
								vs. {game.black.name || game.black.username} ({game.black.rating}) 
								| {this.getDate(game.end_time)} | {this.getTime(game.end_time)}
								| {this.getResult(game.white.result, game.black.result, index, game)}
							</span>
							</h4>
						</div>
					)
				})}
			</div>
		)
	}

	onGameClick = (event, index) => {
		let game = this.state.chesscomGames.slice().reverse()[index]
		this.props.onGameClick(game)
		// console.log(game)
	}

	getDate = (d) => {
		let date = new Date(+(d.toString() + '000')).toLocaleDateString()
		return date
	}

	getTime = (t) => {
		let time = new Date(+(t.toString() + '000')).toLocaleTimeString()
		return time
	}

	getResult = (white_result, black_result, index, game) => {
		let result;
		if (white_result === "win") {
			result = "1-0"
		} else if (black_result === "win") {
			result = "0-1"
		} else {
			result = "1/2-1/2"
		}
		// console.log(white_result, black_result, index+1, result, game)
		return result
	}
}

export default GameList