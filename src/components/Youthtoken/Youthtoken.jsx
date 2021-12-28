import { useEffect, useState } from 'react';
import contract from '../../contract';
import {
	Container,
	Card,
	Form,
	Button,
	Alert,
	Row,
	Col,
} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import web3 from '../../web3';
import Spinner from '../Spinner/Spinner';

const buy = 'Buy Youth Tokens';
const sell = 'Sell Youth Tokens';

const Youthtoken = () => {
	const [priceOfToken, setPriceOfToken] = useState(0);
	const [action, setAction] = useState('');
	const [youthToken, setYouthToken] = useState();
	const [formErrors, setFormErrors] = useState({});
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [currYt, setCurrYt] = useState(0);
	const { user } = useAuth0();

	useEffect(() => {
		(async () => {
			const priceOfToken = await contract.methods
				.getPriceOfToken()
				.call();
			setPriceOfToken(priceOfToken);
			try {
				const response = await fetch(
					`http://localhost:8080/dashboard/${user.sub}`
				);
				const data = await response.json();
				console.log(data);
				setCurrYt(data.numYouthTokens);
			} catch (err) {}
		})();
	}, [user.sub]);

	const handleSubmit = async e => {
		e.preventDefault();
		const newErrors = findFormErrors();
		setFormErrors(newErrors);
		if (Object.keys(newErrors).length === 0) {
			const accounts = await web3.eth.getAccounts();
			if (action === buy) {
				setIsLoading(true);
				setMessage('Please wait for transaction to complete');
				try {
					await contract.methods.buy(user.sub, youthToken).send({
						from: accounts[0],
						value: youthToken * priceOfToken,
					});
					setMessage('');
				} catch (err) {
					setMessage('Some error occurred please try again later');
					setIsError(true);
				}
				setIsLoading(false);
			} else {
				setIsLoading(true);
				setMessage('Please wait for transaction to complete');
				try {
					await contract.methods
						.sell(youthToken, user.sub, accounts[0])
						.send({
							from: accounts[0],
						});
					setMessage('');
				} catch (err) {
					setMessage('Some error occurred please try again later');
					setIsError(true);
				}
				setIsLoading(false);
			}
		}
	};

	const findFormErrors = () => {
		const newErrors = {};
		if (
			!youthToken ||
			typeof youthToken === 'string' ||
			youthToken < 0 ||
			!Number.isInteger(youthToken)
		) {
			newErrors.youthToken =
				'Number of shares is a required field and should contain a positive value';
		}
		return newErrors;
	};

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
								<h2>Youth Tokens : {currYt}</h2>
							</Card.Title>
						</Card>
					</Col>
				</Row>
			</Container>
			<Container className='d-flex flex-column align-items-center'>
				<Card className='shadow w-50 mt-5'>
					<Card.Body className='px-5'>
						<Form>
							<div key={'inline-radio'} className='my-3'>
								<Form.Check
									inline
									label='Buy Youth Token'
									name='group1'
									type='radio'
									onClick={() => {
										setAction(buy);
									}}
									id='inline-radio-1'
								/>
								<Form.Check
									inline
									label='Sell Youth Token'
									name='group1'
									type='radio'
									id='inline-radio-2'
									onClick={() => {
										setAction(sell);
									}}
								/>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Container>
			<Container className='d-flex flex-column align-items-center mb-5'>
				<Card className='shadow w-50 mt-5'>
					<Card.Header className='pt-3 pb d-flex flex-column align-items-center bg-dark text-white'>
						<h2>
							<strong>{action}</strong>
						</h2>
					</Card.Header>
					<Card.Body className='px-5'>
						<strong>
							Price of Youth Token: {priceOfToken} Wei
						</strong>
						<Form onSubmit={handleSubmit}>
							<Form.Group className='mb-3'>
								<Form.Label>
									<br />
									<strong>Number of Youth Tokens</strong>
								</Form.Label>
								<Form.Control
									type='number'
									placeholder='Enter the Number of Youth Tokens'
									value={youthToken}
									onChange={event => {
										setYouthToken(
											parseInt(event.target.value)
										);
									}}
									isInvalid={!!formErrors.youthToken}
									disabled={action.length === 0}
								/>
								<Form.Control.Feedback type='invalid'>
									{formErrors.youthToken}
								</Form.Control.Feedback>
							</Form.Group>
							<div className='d-flex flex-column align-items-center'>
								<Button
									variant='primary'
									type='submit'
									disabled={action.length === 0}>
									Submit
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default Youthtoken;
