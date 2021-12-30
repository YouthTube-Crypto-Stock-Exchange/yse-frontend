import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAuth0 } from '@auth0/auth0-react';
import Order from './Order';
import Spinner from '../Spinner/Spinner';

function Orders() {
	const [orders, setOrders] = useState([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth0();

	useEffect(() => {
		fetch(`http://localhost:8080/orders/${user.sub}`)
			.then(response => response.json())
			.then(data => setOrders(data.orders))
			.catch(err => {
				console.log(err);
				setIsError(true);
			});
	}, [user.sub]);

	if (isError) {
		return (
			<Container className='mt-5'>
				<Alert variant='warning'>
					<p>Some error occurred please try again later</p>
				</Alert>
			</Container>
		);
	}

	if (isLoading) {
		return <Spinner />;
	}

	const handleDelete = (orderId, orderType) => {
		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you want to delete the event?',
			buttons: [
				{
					label: 'Delete',
					onClick: async () => {
						let data = {
							id: orderId,
						};
						setIsLoading(true);
						if (orderType === 'Buy') {
							try {
								await fetch(
									`http://localhost:8080/cancelBuyOrder`,
									{
										method: 'POST',
										body: JSON.stringify(data),
										headers: {
											'Content-type':
												'application/json; charset=UTF-8',
										},
									}
								);
							} catch (err) {
								console.log(err);
								setIsError(true);
							}
						} else {
							try {
								await fetch(
									`http://localhost:8080/cancelSellOrder`,
									{
										method: 'POST',
										body: JSON.stringify(data),
										headers: {
											'Content-type':
												'application/json; charset=UTF-8',
										},
									}
								);
							} catch (err) {
								console.log(err);
								setIsError(true);
							}
						}
						const newOrders = [...orders];
						newOrders.filter(order => order._id !== orderId);
						setOrders(newOrders);
						setIsLoading(false);
					},
				},
				{
					label: 'Cancel',
					onClick: () => {},
				},
			],
		});
	};

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
											<th className='col-1'>
												Cancel Order
											</th>
										</tr>
									</thead>
									<tbody>
										{orders.map(order => (
											<Order
												order={order}
												key={order._id}
												handleDelete={handleDelete}
											/>
										))}
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
