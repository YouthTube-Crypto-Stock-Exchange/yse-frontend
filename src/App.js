import React from 'react';
import './App.css';
// import Navbar from './components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

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
			<Route
				path='/holdings'
				element={<h1>Holdngs</h1> /* Add Holdings component here */}
			/>
			<Route
				path='/dashboard'
				element={<Dashboard /> /* Add Dashboard component here */}
			/>
		</Routes>
	);
	return (
		<>
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
