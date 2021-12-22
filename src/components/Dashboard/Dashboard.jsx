import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import contract from '../../contract';
import web3 from '../../web3';
import Piechart from '../Piechart/Piechart';
import Spinner from '../Spinner/Spinner';
import { Container, Row, Col, Card} from 'react-bootstrap';

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [youthTokens, setYouthTokens] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [isError, setIsError] = useState(false);
	const { user } = useAuth0(); // use user property to make api calls to backend

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:8080/dashboard/${user.sub}`)
			.then(response => response.json())
			.then(async data => {
				const accounts = await web3.eth.getAccounts();
				if (data.msg === `User doesn't exist so creating a new one`) {
					setMessage(
						'Wait while your user profile is being generated'
					);
					await contract.methods
						.createUser(user.sub, 0, user.name)
						.send({
							from: accounts[0],
						});
					setMessage('');
				} else {
					regenerateData(); // TODO: Remove this and uncomment below line
					// setData(data.portfolio);
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

	function regenerateData() {
		const chartData = [];
		for (let i = 0; i < 6; i++) {
			const value = Math.floor(Math.random() * i + 3);
			chartData.push({
				label: i,
				value,
				tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`,
			});
		}
		setData(chartData);
	}

	if (isLoading) {
		return (
			<>
				<Spinner />
				<p>{message}</p>
			</>
		);
	}

	if (isError) {
		return <p>{message}</p>;
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
					<Piechart data={data} />
				) : (
					<p>You haven't invested in any stocks :(</p>
				)}
			</Container>
		</>
	);
};

export default Dashboard;
