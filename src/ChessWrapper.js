import React from 'react'
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"

// import ChessboardWrapper from "./ChessboardWrapper"
import Notations from "./Notations"

class ChessWrapper extends React.Component {
	constructor(props) {
		super(props)
		// console.log('ChessWrapper - constructor', props)
		this.state = {
			game: new Chess(),
			fen: "start",
			history: [],
		}
	}

	// componentDidMount() {
	// 	console.log('ChessWrapper - ComponentDidMount')
	// }

	componentDidUpdate(prevProps, prevState) {
		console.log('ChessWrapper - ComponentDidUpdate', prevState.fen, this.state.fen)
	}

	// componentWillUnmount(prevProps, prevState) {
	// 	console.log('ChessWrapper - ComponentWillUnmount')
	// }

	// componentDidCatch(error, info) {
	// 	console.log('ChessWrapper - ComponentDidCatch')
	// }

	render() {
		// console.log("ChessWrapper - render", this.state.game.fen())
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
								onPieceDrop={this.handlePieceDrop}
								
							/>	
						</div>

						{/* Chess Notations */}
						<div style={{ border: "dotted" }} className="col-sm-4">
							<h2>Notations</h2>
							<Notations 
								history={this.state.history}
								onMoveClick={this.handleMoveClick}
							/>
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

	//When user drops a piece, the move gets input into the chess instance
	//  if the chess instance says the move is illegal then nothing happens
	//  else the chess instance gets updated and fen's state changes 
	//Returns: a value of true or false as required by the chessboard instance
	handlePieceDrop = (sourceSquare, targetSquare, piece) => {		
		let history
		let moved = this.state.game.move({
			from: sourceSquare, 
			to: targetSquare
		})

		let currentHistory = this.state.game.history()
		let notationHistory = this.state.history
		let index = currentHistory.length-1

		if (!moved) {
			return false
		}
		if (currentHistory.length >= notationHistory.length) {
			history = this.state.game.history()
		} else {
			if (currentHistory[index] === notationHistory[index]) {
				history = this.state.history
			} else {
				history = this.state.game.history()
			}
		}
		this.setState({
			fen: this.state.game.fen(),
			history: history,
		})
		return true
	}

	//Method is invoked from Notations.onMoveClick()
	//When invoked, it resets the game and board to that point in time,
	//Notation is not affected
	//Returns: Nothing
	handleMoveClick = (moveNum) => {
		this.state.game.reset()
		for (let i=0;i<=moveNum;i++) {
			this.state.game.move(this.state.history[i])
		}
		this.setState({ fen: this.state.game.fen() })
	}
}

export default ChessWrapper