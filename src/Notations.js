import React from 'react'

class Notations extends React.Component {
	constructor(props) {
		super(props)
		console.log('    Notations - constructor', props)
	}

	// componentDidMount() {
	// 	console.log('    Notations - ComponentDidMount')
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	console.log('    Notations - ComponentDidUpdate', prevProps, this.props)
	// }

	// componentWillUnmount(prevProps, prevState) {
	// 	console.log('    Notations - ComponentWillUnmount')
	// }

	// componentDidCatch(error, info) {
	// 	console.log('    Notations - ComponentDidCatch')
	// }

	render() {
		console.log('    Notations - render', this.formatHistory(this.props.history))
		return (
			<div>
				<table>
					<thead>
						<tr>
							<td>#</td>
							<td>White</td>
							<td>Black</td>
						</tr>
					</thead>
					<tbody>
						{this.formatHistory(this.props.history).map((move, index) => {
							return (
								<tr key={index}>
									<td>{move[0]}</td>
									<td>{move[1]}</td>
									{move[2] && <td>{move[2]}</td>}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
	formatHistory = (history) => {
		let formattedHistory = []
		let move;
		history.forEach((ply, index) => {
			if (index%2===0) {
				move = []
				move.push((index+2)/2)
				move.push(ply)
			} else {
				move.push(ply)
				formattedHistory.push(move)
			}
		})
		if (move && move.length === 2) {
			formattedHistory.push(move)
		}
		return formattedHistory
	}
}

export default Notations