import React, { useState, useEffect } from 'react';
import Piechart from '../Piechart/Piechart';
import Linechart from '../Linechart/Linechart';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const Dashboard = () => {
	const [data, setData] = useState([]);
	const { user, isAuthenticated } = useAuth0(); // use user property to make api calls to backend

	useEffect(() => {
		regenerateData();
	}, []);

	function regenerateData() {
		const chartData = [];
		for (let i = 0; i < 6; i++) {
			const value = Math.floor(Math.random() * i + 3);
			chartData.push({
				label: i,
				value,
				tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`,
			});
		}
		setData(chartData);
	}

	return (
		<>
			<p>
				Current Holdings value:{' '}
				<p style={{ color: 'green' }}>Dynamic Value</p>
			</p>
			<Piechart data={data} />
			{/* <Linechart /> */}
		</>
	);
};

export default withAuthenticationRequired(Dashboard, {
	onRedirecting: () => <h1>Redirecting you to login page...</h1>,
});
