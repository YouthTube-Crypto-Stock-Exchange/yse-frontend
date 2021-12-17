import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Holdings from './components/Holdings/Holdings';
import ProtectedRoute from './components/auth/protected-route';

function App() {
	let routes = (
		<Switch>
			<ProtectedRoute
				path='/createITO'
				component={
					<h1>Create ITO</h1> /* Add Create ITO component here */
				}
			/>
			<ProtectedRoute path='/holdings' component={Holdings} />
			<ProtectedRoute path='/dashboard' component={Dashboard} />
		</Switch>
	);
	return (
		<>
			<Navbar />
			{routes}
		</>
	);
}

export default App;
