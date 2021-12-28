import React, { useState } from 'react';
import {
	FormControl,
	Form,
	Button,
	Navbar,
	Nav,
	Container,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function NavBar() {
	const [channelName, setChannelName] = useState('');
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	let history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		history.push(`/trade?search=${channelName}`);
		setChannelName('');
	};
	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand href={isAuthenticated ? 'dashboard' : '/'}>
					YOUTHtube Stock Exchange
				</Navbar.Brand>
				<Nav className='me-auto'>
					{!isAuthenticated ? (
						<Nav.Link onClick={() => loginWithRedirect()}>
							Login
						</Nav.Link>
					) : (
						<>
							<Nav.Link href='dashboard'>Dashboard</Nav.Link>
							<Nav.Link href='holdings'>Holdings</Nav.Link>
							<Nav.Link href='createITO'>ITO</Nav.Link>
							<Nav.Link href='orders'>Orders</Nav.Link>
							<Nav.Link href='youthtoken'>Buy/Sell Youth Token</Nav.Link>
							<Nav.Link
								onClick={() =>
									logout({
										returnTo: window.location.origin,
									})
								}>
								Logout
							</Nav.Link>
						</>
					)}
				</Nav>
				{isAuthenticated ? (
					<Form className='d-flex' onSubmit={handleSubmit}>
						<FormControl
							type='search'
							placeholder='Search'
							className='me-2'
							aria-label='Search'
							value={channelName}
							onChange={e => {
								setChannelName(e.target.value);
							}}
						/>
						<Button variant='outline-light' type='submit'>
							Search
						</Button>
					</Form>
				) : null}
			</Container>
		</Navbar>
	);
}
export default NavBar;
