import React from 'react'
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"

class ChessWrapper extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			game: new Chess(),
			fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
		}


	}

	componentDidMount() {
		console.log('mount')
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('update', prevProps, prevState)
		console.log(this.state.game.history())
	}

	componentWillUnmount(prevProps, prevState) {
		console.log('unmount')
	}

	componentDidCatch(error, info) {
		console.log('error')
	}

	render() {
		return (
			<>
				<div style={{ border: "solid" }} className="container bg-secondary">
					<div className="row">



						{/* Black info */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<span>Black Info Container</span>
						</div>
						{/* Empty Space */}
						<div style={{ border: "dotted" }} className="col-sm-4"></div>


						{/* Chess Board */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<Chessboard 
								id="BasicBoard" 
								position={this.state.fen}
								showBoardNotation={true}
								onPieceClick={piece => this.handlePieceClick(piece) }
								onPieceDrop={(sourceSquare, targetSquare, piece) => {
									return this.handlePieceDrop(sourceSquare, targetSquare, piece)}
								}
							/>
						</div>

						{/* Chess Notations */}
						<div style={{ border: "dotted" }} className="col-sm-4">
							<span>Chess Notations</span>
						</div>

						{/* White info */}
						<div style={{ border: "dotted" }}  className="col-sm-8">
							<span>White Info Container</span>
						</div>
						{/* Empty Space */}
						<div style={{ border: "dotted" }}  className="col-sm-4"></div>

						{/* Game List */}
						<div style={{ border: "dotted" }}  className="col-sm-12">
							<span>Game List</span>
						</div>



					</div>
				</div>
			</>
		)
	}

	handlePieceClick = (piece) => {
		console.log('handlePieceClick() ', piece)
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