import React , { useState } from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import Holdings from './components/Holdings';
import NavBar from './components/NavBar';
import Trade from './components/Trade';

function App() {
    const [searchValue, setSearchValue] = useState("");
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
				element = {<Holdings />}
			/>
			<Route
				path='/trade'
				element={<Trade
                    searchValue={searchValue}
                />}
			/>
			<Route
				path='/dashboard'
				element={<h1>Dashboard</h1> }
			/>
		</Routes>
	);
	return (
		<>
            <NavBar
                setValue={setSearchValue}
            />
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
