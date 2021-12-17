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
	const [inputValue, setInputValue] = useState('');
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	let history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		history.push(`/trade?search=${inputValue}`);
		setInputValue('');
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
					<Form className='d-flex'>
						<FormControl
							type='search'
							placeholder='Search'
							className='me-2'
							aria-label='Search'
							value={inputValue}
							onChange={e => {
								setInputValue(e.target.value);
							}}
						/>
						<Button variant='outline-light' onClick={handleSubmit}>
							Search
						</Button>
					</Form>
				) : null}
			</Container>
		</Navbar>
	);
}
export default NavBar;
