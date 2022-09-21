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
			timestamps: [],
			black_time: '',
			white_time: '',
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
							<h4>{this.state.black_time}</h4>
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
							<h4>{this.state.white_time}</h4>
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

	//Load game, set timer
	//Odd on length is white, even on index is black
	//Subtract 1 to get other side, just guess and check, don't think too hard!
	//edge case are abortions, figure out logic on that later!
	handleGameClick = (game) => {
		let newGame = new Chess()
		newGame.loadPgn(game.pgn)
		let comments = newGame.getComments()
		let totalPly = newGame.getComments().length

		console.log(comments[totalPly-2].comment)
		this.setState({ 
			game: newGame,
			fen: newGame.fen(),
			history: newGame.history(),
			white: game.white,
			black: game.black,
			timestamps: comments.map((obj) => obj.comment),
			white_time: newGame.turn() === "w" ? comments[totalPly-2].comment : comments[totalPly-1].comment,
			black_time: newGame.turn() === "w" ? comments[totalPly-1].comment : comments[totalPly-2].comment,
		})
	}

	//done
	//Method is invoked from Notations.onMoveClick()
	//When invoked, it resets the game and board to that point in time,
	//Notation is not affected
	//Returns: Nothing
	handleMoveClick = (moveNum) => {
		this.state.game.reset()
		for (let index = 0; index <= moveNum; index++) {
			this.handleRightClick()
		}

	}

	//Done, just reset fen and timers, nothing else!
	handleDoubleLeftClick = () => {
		this.state.game.reset()
		this.setState({ 
			fen: this.state.game.fen(),
			white_time: this.state.timestamps[0],
			black_time: this.state.timestamps[0],
		})
	}

	//done, just invoke handlerightclick
	handleDoubleRightClick = () => {
		let length = this.state.game.history.length
		for (let index = length; index < this.state.timestamps.length; index++) {
			this.handleRightClick()
		}
	}

	//done, hard edge cases on 2 and 1
	handleLeftClick = () => {
		this.state.game.undo()
		let comments = this.state.game.getComments()
		let totalPly = 0

		if (comments) {
			totalPly = this.state.game.getComments().length
		} 

		if (totalPly === 1) {
			this.setState({ 
				fen: this.state.game.fen(), 
				white_time: comments[0].comment,
				black_time: comments[0].comment,
			})
		} else if (totalPly === 0) {
			this.setState({ 
				fen: this.state.game.fen(),
			})
		} else 
		this.setState({ 
			fen: this.state.game.fen(), 
			white_time: this.state.game.turn() === "w" ? comments[totalPly-2].comment : comments[totalPly-1].comment,
			black_time: this.state.game.turn() === "w" ? comments[totalPly-1].comment : comments[totalPly-2].comment,
		})
	}

	//Done, edge cases are beginning and end
	handleRightClick = () => {
		let index = this.state.game.history().length
		let move = this.state.history[index]
		this.state.game.move(move)
		this.state.game.setComment(this.state.timestamps[index])
		if (index === 0) {
			this.setState({ 
				fen: this.state.game.fen(), 
				white_time: this.state.timestamps[index],
				black_time: this.state.timestamps[index],
			})
		} else if (index >= this.state.timestamps.length) {
			this.setState({
				fen: this.state.game.fen(),
			})
		}else {
			this.setState({ 
				fen: this.state.game.fen(),
				white_time: this.state.game.turn() === "w" ? this.state.timestamps[index-1] : this.state.timestamps[index],
				black_time: this.state.game.turn() === "w" ? this.state.timestamps[index] : this.state.timestamps[index-1],
			})

		}

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