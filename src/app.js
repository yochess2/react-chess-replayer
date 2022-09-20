import React from 'react'
import NavBar from './NavBar'
import ChessWrapper from './ChessWrapper'

import "./app.css"

class App extends React.Component {
	render() {
		return (
			<>
				<NavBar />
				<ChessWrapper />
			</>
		)
	}
}

export default App