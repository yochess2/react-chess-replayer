import React from 'react'
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"
import { 
	FaAngleLeft,
	FaAngleRight,
	FaAngleDoubleLeft,
	FaAngleDoubleRight 
} from "react-icons/fa"

// import ChessboardWrapper from "./ChessboardWrapper"
import Notations from "./Notations"
import GameList from "./GameList"

class ChessWrapper extends React.Component {
	constructor(props) {
		super(props)
		// console.log('ChessWrapper - constructor')
		this.state = {
			username: 'tiger415',
			game: new Chess(),
			fen: "start",
			history: [],
			white: {
				name: "White Player",
				username: null,
				rating: null,
			},
			black: {
				name: "Black Player",
				username: null,
				rating: null,
			},
		}
	}

	componentDidMount() {
		// console.log("ChessWrapper - componentDidMount")
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log('ChessWrapper - ComponentDidUpdate', prevState.fen, this.state.fen)
		// console.log('ChessWrapper - ComponentDidUpdate')
	}

	componentWillUnmount(prevProps, prevState) {
		console.log('ChessWrapper - ComponentWillUnmount')
	}

	componentDidCatch(error, info) {
		console.log('ChessWrapper - ComponentDidCatch')
	}

	render() {
		// console.log("ChessWrapper - render")
		return (
			<>
				<div style={{ border: "solid" }} className="container bg-secondary">
					<div className="row">



						{/* Black info */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<h2>Black Info Container</h2>
							<h4>{this.state.black.name || this.state.black.username} ({this.state.black.rating})</h4>
						</div>


						{/* Search Space */}
						<div style={{ border: "dotted" }} className="col-sm-4">
							<div className="form-group form-row">
								<label className="col-sm-4">Search username</label>
								<input
									type="text"
									className="form-control"
									value={this.state.username}
									onChange={(event) => { 
										this.setState({username: event.target.value})
									}}
								/>
								<button 
									className="btn btn-primary"
									onClick={this.onSearchClick}
								>
									Search
								</button>
							</div>
						</div>


						{/* Chess Board */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<Chessboard 
								id="BasicBoard" 
								position={this.state.fen}
								showBoardNotation={true}
								onPieceDrop={this.handlePieceDrop}
								animationDuration={0}
								areArrowsAllowed={true}
								onSquareRightClick={() => {
									// console.log('hi')
								}}
								
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
							<h4>{this.state.white.name || this.state.white.username} ({this.state.white.rating})</h4>
						</div>


						{/* Arrows */}
						<div style={{ border: "dotted" }}  className="col-sm-4">
							<div className="row">
								<div className="col-sm-3" style={{ border: 'solid'}}>
									<FaAngleDoubleLeft 
										className="hand-icon" 
										size="5em"
										onClick={this.handleDoubleLeftClick}
									/>
								</div>
								<div className="col-sm-3" style={{ border: 'solid'}}>
									<FaAngleLeft 
										className="hand-icon" 
										size="5em"
										onClick={this.handleLeftClick}
									/>
								</div>
								<div className="col-sm-3" style={{ border: 'solid'}}>
									<FaAngleRight 
										className="hand-icon" 
										size="5em"
										onClick={this.handleRightClick}
									/>
								</div>
								<div className="col-sm-3" style={{ border: 'solid'}}>
									<FaAngleDoubleRight 
										className="hand-icon" 
										size="5em"
										onClick={this.handleDoubleRightClick}
									/>
								</div>
							</div>
						</div>


						{/* Game List */}
						<div style={{ border: "dotted" }}  className="col-sm-12">
							<h2>Game List</h2>
								<GameList 
									onGameClick={this.handleGameClick}
									chesscomGames={this.state.chesscomGames}
								/>
						</div>



					</div>
				</div>
			</>
		)
	}


	onSearchClick = () => {
		console.log(this.state)
	}

	//When user drops a piece, the move gets input into the chess instance
	//  if the chess instance says the move is illegal then nothing happens
	//  else the chess instance gets updated and fen's state changes 
	//Returns: a value of true or false as required by the chessboard instance
	handlePieceDrop = (sourceSquare, targetSquare, piece) => {		
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


		let history
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

	handleGameClick = (game) => {
		// this.state.game.reset()
		let newGame = new Chess()		
		newGame.loadPgn(game.pgn)
		console.log(newGame.header())
		// console.log(newGame.history())

		// for (let i=0;i<game.history.length;i++) {
		// 	this.state.game.move(game.history[i])
		// }
		this.setState({ 
			fen: newGame.fen(),
			history: newGame.history(),
			white: game.white,
			black: game.black,
		})
	}

	handleDoubleLeftClick = () => {
		this.state.game.reset()
		this.setState({ fen: this.state.game.fen() })
	}

	//TODO, more effiecent man, and dont repeat
	handleDoubleRightClick = () => {
		// console.log(this.state.history, this.state.game.history())
		this.handleMoveClick(this.state.history.length)
	}

	handleLeftClick = () => {
		this.state.game.undo()
		this.setState({ fen: this.state.game.fen() })
	}

	handleRightClick = () => {
		let index = this.state.game.history().length
		let move = this.state.history[index]
		this.state.game.move(move)
		this.setState({ fen: this.state.game.fen() })
	}

	// onSquareRightClick(square) {
	//     const colour = 'rgba(0, 0, 255, 0.4)';
	//     setRightClickedSquares({
	//       ...rightClickedSquares,
	//       [square]:
	//         rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
	//           ? undefined
	//           : { backgroundColor: colour }
	//     });
	//   }
}

export default ChessWrapper