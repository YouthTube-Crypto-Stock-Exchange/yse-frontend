import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Holdings from './components/Holdings/Holdings';
import ProtectedRoute from './components/auth/protected-route';
import NavBar from './components/NavBar';
import Trade from './components/Trade';

function App() {
	const [searchValue, setSearchValue] = useState('');
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
			<Route path='/trade'>
				<Trade searchValue={searchValue} />
			</Route>
		</Switch>
	);
	return (
		<>
			<NavBar setValue={setSearchValue} />
			{routes}
		</>
	);
}

export default App;
