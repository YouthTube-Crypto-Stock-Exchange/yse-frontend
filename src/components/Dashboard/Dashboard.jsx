import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import contract from '../../contract';
import web3 from '../../web3';
import Piechart from '../Piechart/Piechart';
import Spinner from '../Spinner/Spinner';
import { Container, Row, Col, Card, Alert, Table } from 'react-bootstrap';

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [youthTokens, setYouthTokens] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [curTotal, setCurTotal] = useState(0);
	const [invTotal, setInvTotal] = useState(0);
	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const { user } = useAuth0(); // use user property to make api calls to backend

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:8080/dashboard/${user.sub}`)
			.then(response => response.json())
			.then(async data => {
				if (data.msg === `User doesn't exist so creating a new one`) {
					const accounts = await web3.eth.getAccounts();
					setMessage(
						'Wait while your user profile is being generated'
					);
					try {
						await contract.methods
						.createUser(user.sub, 0, user.name)
						.send({
							from: accounts[0],
						});
						setMessage('');
					} catch(err) {
						setIsError(true);
						setMessage('Some error occurred please try again later')
					}
				} else {
					let invTotal = 0;
					let curTotal = 0;
					for (let i = 0; i < data.portfolio.length; i++) {
						data.portfolio[i].total =
							data.portfolio[i].numShares *
							data.portfolio[i].curPrice;
						curTotal += data.portfolio[i].total;
						invTotal +=
							data.portfolio[i].numShares *
							data.portfolio[i].priceAtWhichBought;
					}
					setInvTotal(invTotal);
					setCurTotal(curTotal);
					setData(data.portfolio);
					setYouthTokens(data.numYouthTokens);
				}
				setIsLoading(false);
			})
			.catch(err => {
				setMessage(`Some error occurred please try again later`);
				console.log(err);
				setIsError(true);
				setIsLoading(false);
			});
	}, [user.name, user.sub]);

	if (isLoading) {
		return (
			<>
				<Spinner />
				<Container className='mt-5'>
					<Alert variant='warning'>
						<p>{message}</p>
					</Alert>
				</Container>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Container className='mt-5'>
					<Alert variant='danger'>
						<p>{message}</p>
					</Alert>
				</Container>
			</>
		);
	}

	return (
		<>
			<Container>
				<Row className='py-4'>
					<Col className='d-flex flex-column align-items-center'>
						<Card
							border='dark'
							className='bg-dark text-light px-2 pt-2 text-center w-75'>
							<Card.Title>
								<h2>Youth Tokens : {youthTokens}</h2>
							</Card.Title>
						</Card>
					</Col>
				</Row>
				{data.length !== 0 ? (
					<Container>
						<Row>
							<Col>
								<Piechart data={data} />
							</Col>
							<Col>
								<Table hover className='text-center'>
									<thead>
										<tr>
											<th>Invested Total</th>
											<th>Current Total</th>
											<th>P/L</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th>{invTotal}</th>
											<th>{curTotal}</th>
											<th>
												{invTotal -
													curTotal}
											</th>
										</tr>
									</tbody>
								</Table>
							</Col>
						</Row>
					</Container>
				) : (
					<Container className='mt-5'>
						<Alert>
							<p>You haven't invested in any stocks</p>
						</Alert>
					</Container>
				)}
			</Container>
		</>
	);
};

export default Dashboard;
