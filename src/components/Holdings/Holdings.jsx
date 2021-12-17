import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Holdings(props) {
	const [holdings, setHoldings] = useState([]);
	const [ether, setEther] = useState(0);
	const [youthTokens, setYouthTokens] = useState(0);
	const { user } = useAuth0(); // use this user to access backend

	useEffect(() => {
		// fetch('http://localhost:4000/getHoldings/1')
		// 	.then(response => response.json())
		// 	.then(data => setHoldings(data));
		// fetch('http://localhost:4000/getBalance/1')
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		setEther(data.ether);
		// 		setYouthTokens(data.youthTokens);
		// 	});
	}, []);

	return (
		<div className='min-h-100'>
			<Container>
				<Row className='py-4'>
					<Col className='d-flex flex-column align-items-center'>
						<Card
							border='dark'
							className='bg-dark text-light px-2 pt-2 text-center w-50'>
							<Card.Title>
								<h2> Ether : {ether} </h2>
							</Card.Title>
						</Card>
					</Col>
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
											<th className='col-1'> Symbol </th>
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
											if (holding.change > 0) {
												textColor += 'success';
												deltaSign = '+ ';
											} else {
												textColor += 'danger';
												deltaSign = '- ';
											}
											return (
												<tr>
													<td>{holding.channel}</td>
													<td>{holding.symbol}</td>
													<td>{holding.volume}</td>
													<td>
														{holding.investedPrice}
													</td>
													<td>{holding.avgPrice}</td>
													<td>
														{holding.currentPrice}
													</td>
													<td className={textColor}>
														{deltaSign}
														{holding.pnl}
													</td>
													<td className={textColor}>
														{deltaSign}
														{holding.change}%
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
