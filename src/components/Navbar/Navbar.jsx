import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const NavbarComp = props => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand href='dashboard'>
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
			</Container>
		</Navbar>
	);
};

export default NavbarComp;
