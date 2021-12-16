import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Holdings from './components/Holdings';

function App() {
	const { isAuthenticated, loginWithRedirect, user } = useAuth0();
	let routes = (
		<Routes>
			<Route
				path='/createITO'
				element={
					<h1>Create ITO</h1> /* Add Create ITO component here */
				}
			/>
			<Route path='/holdings' element={<Holdings />} />
			<Route
				path='/dashboard'
				element={<Dashboard /> /* Add Dashboard component here */}
			/>
		</Routes>
	);
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand href='#home'>
						YOUTHtube Stock Exchange
					</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link href='holdings'>Holdings</Nav.Link>
						<Nav.Link href='dashboard'>Dashboard</Nav.Link>
						<Nav.Link href='createITO'>ITO</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			{routes}
			{!isAuthenticated ? (
				<button onClick={() => loginWithRedirect()}>Login</button>
			) : (
				JSON.stringify(user)
			)}
		</>
	);
}

export default App;
