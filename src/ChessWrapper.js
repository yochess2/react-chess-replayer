import React from 'react'
import Chess from "chess.js"

import { Chessboard } from "react-chessboard"

export class ChessWrapper extends React.Component {
	render() {
		return (
			<>
				<div style={{ border: "solid" }} className="container">
					<Chessboard id="BasicBoard" />
				</div>
			</>
		)
	}
}

export default ChessWrapper