import React from 'react'
import { Chessboard } from "react-chessboard"

import Notations from "./Notations"

class ChessWrapper extends React.Component {
	constructor(props) {
		super(props)
		console.log('ChessWrapper - constructor', props)

		this.state = {
			fen: props.game.fen(),
			history: props.game.history(),
		}
	}

	// componentDidMount() {
	// 	console.log('ChessWrapper - ComponentDidMount')
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	console.log('ChessWrapper - ComponentDidUpdate', prevState.fen, this.state.fen)
	// }

	// componentWillUnmount(prevProps, prevState) {
	// 	console.log('ChessWrapper - ComponentWillUnmount')
	// }

	// componentDidCatch(error, info) {
	// 	console.log('ChessWrapper - ComponentDidCatch')
	// }

	render() {
		console.log("ChessWrapper - render", this.state.history)
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
							<Notations history={this.state.history}/>
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
		let moved = this.props.game.move({
			from: sourceSquare, 
			to: targetSquare
		})
		if (!moved)
			return false
		this.setState({
			fen: this.props.game.fen(),
			history: this.props.game.history()
		})
		return true
	}
}

export default ChessWrapper