import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Table, Button, Modal, Card } from 'react-bootstrap';
import Linechart from '../Linechart/Linechart';

const Trade = props => {
	const [pageFound, setPageFound] = useState(true);
	const [influencer, setInfluencer] = useState({});
	const searchValue = new URLSearchParams(props.location.search).get(
		'search'
	);
	useEffect(() => {
		// fetch(`http://localhost:8080/getInfluencerDetails/${searchValue}`)
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		if (data.msg === 'Influencer Not Found') {
		// 			setPageFound(false);
		// 		} else {
		// 			setInfluencer(data.influencer);
		// 			setPageFound(true);
		// 		}
		// 	});
	}, [searchValue]);
	return (
		<>
			{pageFound ? (
				<Container>
					<Row>
						<Card.Title className='primary px-1 pt-2 text-center'>
							<h2>Name: {searchValue}</h2>
						</Card.Title>
						<Col>
							<Linechart />
						</Col>
						<Col>
							<Table hover className='text-center'>
								<thead>
									<tr>
										<th>Current Price</th>
										<th>Average Price</th>
										<th>Number of Shares</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>{influencer.curPrice}</th>
										<th>{influencer.averagePrice}</th>
										<th>{influencer.numShares}</th>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
					<br />
					<br />
					<Row className='align-items-center'>
						<Col className='d-flex justify-content-end'>
							<Button variant='success'>Buy</Button>
						</Col>
						<Col className='d-flex justify-content-start'>
							<Button variant='danger'>Sell</Button>
						</Col>
					</Row>
				</Container>
			) : (
				<h2>Channel doesn't exists Please Try again</h2>
			)}
		</>
	);
};
export default withRouter(Trade);
