import React, { useState, useEffect } from 'react';
import Piechart from '../Piechart/Piechart';
import { useAuth0 } from '@auth0/auth0-react';
import web3 from '../../web3';
import contract from '../../contract';
import Spinner from '../Spinner/Spinner';

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [youthTokens, setYouthTokens] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { user } = useAuth0(); // use user property to make api calls to backend

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:8080/dashboard/${user.sub}`)
			.then(response => response.json())
			.then(async data => {
				const accounts = await web3.eth.getAccounts();
				if(data.msg === `User doesn't exist so creating a new one`) {
					setMessage('Wait while your user profile is being generated');
					await contract.methods.createUser(user.sub, 0, user.name).send({
						from: accounts[0]
					});
					setMessage('Profile successfully created');
				} else {
					console.log('Here');
					regenerateData(); // TODO: Remove this and uncomment below line
					// setData(data.portfolio);
					setYouthTokens(data.numYouthTokens);
				}
				setIsLoading(false);
			})
			.catch(err => console.log(err));
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

	if(isLoading) {
		return (
			<>
				<Spinner />
				<p>{message}</p>
			</>
		)
	}

	return (
		<>
			<p>
				Current Holdings value:{' '}
				<p style={{ color: 'green' }}>{youthTokens}</p>
			</p>
			{data.length !== 0 ? <Piechart data={data} /> : <p>You haven't invested in any stocks :(</p>}
		</>
	);
};

export default Dashboard;
