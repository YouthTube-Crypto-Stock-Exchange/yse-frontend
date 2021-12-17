import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

function Orders(props) {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		// fetch('http://localhost:4000/getOrders/1')
		//     .then(response => response.json())
		//     .then(data => setOrders(data));
	}, []);

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
												Bid/Aggressive
											</th>
											<th className='col-1'>
												Order Status
											</th>
										</tr>
									</thead>
									<tbody>
										{orders.map(order => {
											console.log(order);
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
													<td>{order.channel}</td>
													<td>{order.volume}</td>
													<td>{order.price}</td>
													<td>{order.bs}</td>
													<td>{order.ba}</td>
													<td>
														<Card
															bg={bgColor}
															text={textColor}>
															<Card.Header>
																{
																	order.orderStatus
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
