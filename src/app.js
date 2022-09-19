import React from 'react'
import NavBar from './NavBar'
import ChessWrapper from './ChessWrapper'
import { Chess } from "chess.js"

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			game: new Chess()
		}
	}

	render() {
		return (
			<>
				<NavBar />
				<ChessWrapper game={this.state.game}/>
			</>
		)
	}
}

export default App