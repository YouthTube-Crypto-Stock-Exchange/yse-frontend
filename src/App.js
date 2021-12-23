import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import './App.css';
import { Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Holdings from './components/Holdings/Holdings';
import ProtectedRoute from './components/auth/protected-route';
import NavBar from './components/Navbar/Navbar';
import Trade from './components/Trade/Trade';
import Ito from './components/Ito/Ito';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Spinner from './components/Spinner/Spinner';
import Orders from './components/Orders/Orders';

function App() {
	const { isAuthenticated } = useAuth0();
	const history = useHistory();
	let routes = (
		<Switch>
			<ProtectedRoute path='/createITO' component={Ito} />
			<ProtectedRoute path='/holdings' component={Holdings} />
			<ProtectedRoute path='/dashboard' component={Dashboard} />
			<ProtectedRoute path='/trade' component={Trade} />
			<ProtectedRoute path='/orders' component={Orders} />
		</Switch>
	);

	useEffect(() => {
		if (isAuthenticated) {
			history.replace(
				history.location.pathname === '/'
					? 'dashboard'
					: history.location.pathname
			);
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
