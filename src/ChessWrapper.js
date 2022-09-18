import React from 'react'
import Chess from "chess.js"

import { Chessboard } from "react-chessboard"

export class ChessWrapper extends React.Component {
	render() {
		return (
			<>
				<div style={{ border: "solid" }} className="container bg-secondary">
					<div className="row">




						{/* Black info */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<span>Black Info Container</span>
						</div>
						<div style={{ border: "dotted" }} className="col-sm-4"></div>


						{/* Chess Board */}
						<div style={{ border: "dotted" }} className="col-sm-8">
							<Chessboard id="BasicBoard" />
						</div>

						{/* Chess Notations */}
						<div style={{ border: "dotted" }} className="col-sm-4">
							<span>Chess Notations</span>
						</div>

						{/* White info */}
						<div style={{ border: "dotted" }}  className="col-sm-8">
							<span>White Info Container</span>
						</div>
						<div style={{ border: "dotted" }}  className="col-sm-4"></div>

						<div style={{ border: "dotted" }}  className="col-sm-12">
							<span>Games</span>
						</div>




					</div>
				</div>
			</>
		)
	}
}

export default ChessWrapper