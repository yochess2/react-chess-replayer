import React from 'react'
import NavBar from './NavBar'
import ChessWrapper from './ChessWrapper'

export class App extends React.Component {
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