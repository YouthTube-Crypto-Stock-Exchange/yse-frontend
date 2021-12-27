import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import web3 from '../../web3';

function Orders() {
	const [orders, setOrders] = useState([]);
	const [isError, setIsError] = useState(false);
	const { user } = useAuth0();

	useEffect(async() => {
        const accounts = await web3.eth.getAccounts();
		fetch(`http://localhost:8080/orders/${accounts[0]}`)
		    .then(response => response.json())
		    .then(data => setOrders(data.orders))
			.catch(err => {
				console.log(err);
				setIsError(true);
			});
	}, [user.sub]);

	if(isError) {
		return <p>Some error occurred please try again later</p>
	}

	return (
		<div className='min-h-100'>
			<Container>
				<Row className='mt-4'>
					<Col>
						<Card border='dark' className='px-1 pt-2'>
							<Card.Title className='primary px-1 pt-2 text-center'>
								<h2>Orders</h2>
							</Card.Title>
							<Card.Body>
								<Table hover className='text-center'>
									<thead>
										<tr>
											<th className='col-3'>Channel</th>
											<th className='col-1'>Volume</th>
											<th className='col-1'>
												Total Paid
											</th>
											<th className='col-1'>Buy/Sell</th>
											<th className='col-1'>
												Order Status
											</th>
										</tr>
									</thead>
									<tbody>
										{orders.map(order => {
											let bgColor = '';
											let textColor = 'white';
											if (
												order.orderStatus === 'complete'
											) {
												bgColor += 'success';
											} else if (
												order.orderStatus === 'failed'
											) {
												bgColor += 'danger';
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
														<Card
															bg={bgColor}
															text={textColor}>
															<Card.Header>
																{
																	order.status
																}
															</Card.Header>
														</Card>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Orders;
