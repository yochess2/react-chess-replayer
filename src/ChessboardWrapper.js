import React from 'react'
import { Chessboard } from "react-chessboard"

class ChessboardWrapper extends React.Component {
	constructor(props) {
		super(props)
	}

	// componentDidMount() {
	// 	console.log('    ChessboardWrapper - ComponentDidMount')
	// }

	componentDidUpdate(prevProps, prevState) {
		console.log('    ChessboardWrapper - ComponentDidUpdate', prevProps, this.props)
	}

	// componentWillUnmount(prevProps, prevState) {
	// 	console.log('    ChessboardWrapper - ComponentWillUnmount')
	// }

	// componentDidCatch(error, info) {
	// 	console.log('    ChessboardWrapper - ComponentDidCatch')
	// }

	render() {
		return (
			<>
				<Chessboard 
					id="BasicBoard" 
					position={this.props.game.fen()}
					showBoardNotation={true}
					onPieceDrop={(sourceSquare, targetSquare, piece) => {
						return this.props.onPieceDrop(sourceSquare, targetSquare, piece)}
					}
				/>	
			</>
		)
	}
}

export default ChessboardWrapper