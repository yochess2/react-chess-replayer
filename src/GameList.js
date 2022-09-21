import React from 'react'
import ChessWebAPI from 'chess-web-api'


class GameList extends React.Component {
	constructor(props) {
		// console.log('Game List - constructor')
		super(props)
		this.state = {
			api: new ChessWebAPI(),
			chesscomGames: [],
		}
	}

	componentDidMount() {
		console.log('    Game List - ComponentDidMount', this.props.username)
		this.state.api
			.getPlayerCompleteMonthlyArchives(this.props.username, 2022, 9)
			.then((res) => {
				console.log('        success!', res.body.games[0])
				this.setState({ chesscomGames: res.body.games })
			})
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log('    Game List - ComponentDidUpdate', this.props, prevProps, this.state, prevState)
		if (this.props.username !== prevProps.username) {
			this.state.api
				.getPlayerCompleteMonthlyArchives(this.props.username, 2022, 9)
				.then(res => {
					console.log('        success!', res.body.games[0])
					this.setState({ chesscomGames: res.body.games })
				})
		}
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