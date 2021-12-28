import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Holdings(props) {
	const [holdings, setHoldings] = useState([]);
	const [youthTokens, setYouthTokens] = useState(0);
	const [isError, setIsError] = useState(false);
	const { user } = useAuth0();

	useEffect(() => {
		fetch(`http://localhost:8080/holdings/${user.sub}`)
			.then(response => response.json())
			.then(holdings => {
				setHoldings(holdings.portfolio);
				console.log(holdings.portfolio);
				setYouthTokens(holdings.numYouthTokens);
			})
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
				<Row>
					<Col>
						<Card border='dark' className='px-2 pt-2'>
							<Card.Title className='primary px-2 pt-2 text-center'>
								<h2>Holdings</h2>
							</Card.Title>
							<Card.Body>
								<Table hover className='text-center'>
									<thead>
										<tr>
											<th className='col-3'> Channel </th>
											<th className='col-1'>
												{' '}
												Number of Shares{' '}
											</th>
											<th className='col-1'>
												{' '}
												Invested Price{' '}
											</th>
											<th className='col-1'>
												{' '}
												Average Price{' '}
											</th>
											<th className='col-1'>
												{' '}
												Current Price{' '}
											</th>
											<th className='col-1'> P/L </th>
											<th className='col-1'> Change </th>
										</tr>
									</thead>
									<tbody>
										{holdings.map(holding => {
											let textColor = 'text-';
											let deltaSign;
											const change = holding.curPrice - holding.priceAtWhichBought;
											if (change >= 0) {
												textColor += 'success';
												deltaSign = '+ ';
											} else {
												textColor += 'danger';
												deltaSign = '- ';
											}
											return (
												<tr>
													<td>{holding.name}</td>
													<td>{holding.numShares}</td>
													<td>
														{holding.priceAtWhichBought}
													</td>
													<td>{holding.averagePrice}</td>
													<td>
														{holding.curPrice}
													</td>
													<td className={textColor}>
														{deltaSign}
														{change}
													</td>
													<td className={textColor}>
														{deltaSign}
														{change/holding.priceAtWhichBought * 100}%
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

export default Holdings;
