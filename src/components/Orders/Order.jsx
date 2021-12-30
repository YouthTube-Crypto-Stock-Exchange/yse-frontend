import { Card, Button } from 'react-bootstrap';

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const Order = ({ order, handleDelete }) => {
	let bgColor = '';
	let textColor = 'white';
	if (order.status === 'Completed') {
		bgColor += 'success';
	} else if (order.status === 'failed') {
		bgColor += 'danger';
	} else if (order.status === 'Cancelled') {
		bgColor += 'primary';
	} else {
		bgColor += 'warning';
		textColor = 'dark';
	}
	return (
		<tr>
			<td>{order.influencerName}</td>
			<td>{order.quantity}</td>
			<td>{order.price}</td>
			<td>{order.type}</td>
			<td>
				<Card bg={bgColor} text={textColor}>
					<Card.Header>
						{capitalizeFirstLetter(order.status)}
					</Card.Header>
				</Card>
			</td>
			<td>
				<Button
					onClick={() => handleDelete(order._id, order.type)}
					variant='danger'
					disabled={
						order.status === 'Completed' ||
						order.status === 'failed' ||
						order.status === 'Cancelled'
					}>
					Delete
				</Button>
			</td>
		</tr>
	);
};

export default Order;
