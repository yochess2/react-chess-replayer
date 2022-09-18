import React from 'react'
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"

import Notations from "./Notations"

class ChessWrapper extends React.Component {
	constructor(props) {
		console.log('ChessWrapper - constructor')
		super(props)

		this.state = {
			game: new Chess(),
			fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
			last_move_was_legal: null
		}


	}

	componentDidMount() {
		console.log('ChessWrapper - ComponentDidMount')
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('ChessWrapper - ComponentDidUpdate', prevProps, prevState)
		console.log(this.state.game.history())
	}

	componentWillUnmount(prevProps, prevState) {
		console.log('ChessWrapper - ComponentWillUnmount')
	}

	componentDidCatch(error, info) {
		console.log('ChessWrapper - ComponentDidCatch')
	}

	render() {
		console.log("ChessWrapper - render")
		return (
			<>
				<div style={{ border: "solid" }} className="container bg-secondary">
					<div className="row">



						{/* Black info */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<h2>Black Info Container</h2>
						</div>
						{/* Empty Space */}
						<div style={{ border: "dotted" }} className="col-sm-4"></div>


						{/* Chess Board */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<Chessboard 
								id="BasicBoard" 
								position={this.state.fen}
								showBoardNotation={true}
								onPieceDrop={(sourceSquare, targetSquare, piece) => {
									return this.handlePieceDrop(sourceSquare, targetSquare, piece)}
								}
							/>
						</div>

						{/* Chess Notations */}
						<div style={{ border: "dotted" }} className="col-sm-4">
							<h2>Notations</h2>
							<Notations history={this.state.game.history()}/>
						</div>

						{/* White info */}
						<div style={{ border: "dotted" }}  className="col-sm-8">
							<h2>White Info Container</h2>
						</div>
						{/* Empty Space */}
						<div style={{ border: "dotted" }}  className="col-sm-4"></div>

						{/* Game List */}
						<div style={{ border: "dotted" }}  className="col-sm-12">
							<h2>Game List</h2>
						</div>



					</div>
				</div>
			</>
		)
	}

	handlePieceDrop = (sourceSquare, targetSquare, piece) => {
		let moved = this.state.game.move({ 
			from: sourceSquare, 
			to: targetSquare
		})

		if (!moved) {
			// console.log('Invalid Move: ', moved)
			return false
		}
		// console.log("Move: ", moved)
		this.setState({fen: this.state.game.fen()})
		return true
	}
}

export default ChessWrapper