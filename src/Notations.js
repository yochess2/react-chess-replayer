import React from 'react'

class Notations extends React.Component {
	constructor(props) {
		super(props)
		console.log('    Notations - constructor', this.props.history)
	}

	componentDidMount() {
		console.log('    Notations - ComponentDidMount')
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('    Notations - ComponentDidUpdate', prevProps, this.props)
	}

	componentWillUnmount(prevProps, prevState) {
		console.log('    Notations - ComponentWillUnmount')
	}

	componentDidCatch(error, info) {
		console.log('    Notations - ComponentDidCatch')
	}

	render() {
		console.log('    Notations - render', this.props.history)
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
						{this.props.history.map((move, index) => {
							return (index%2===1?<tr><td>{move}</td></tr>:<tr><td>{move}</td></tr>)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Notations