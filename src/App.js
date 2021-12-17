import React, { useEffect } from 'react';
import './App.css';
import { Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Holdings from './components/Holdings/Holdings';
import ProtectedRoute from './components/auth/protected-route';
import NavBar from './components/Navbar/NavBar';
import Trade from './components/Trade/Trade';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Spinner from './components/Spinner/Spinner';

function App() {
	const { isAuthenticated } = useAuth0();
	const history = useHistory();
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
			<ProtectedRoute path='/trade' component={Trade} />
		</Switch>
	);

	useEffect(() => {
		if (isAuthenticated) {
			history.replace('/dashboard');
		}
	}, [isAuthenticated, history]);

	return (
		<>
			<NavBar />
			{routes}
		</>
	);
}

export default withAuthenticationRequired(App, {
	onRedirecting: () => <Spinner />,
});
