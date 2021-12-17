import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

const Trade = props => {
	const [pageFound, setPageFound] = useState(false);
	const searchValue = new URLSearchParams(props.location.search).get(
		'search'
	);
	const { user } = useAuth0();
	useEffect(() => {
		console.log(user);
		// let path = 'http://localhost:4000/doesChannelExist/' + searchValue;
		// fetch(path)
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		if (data.channelFound) setPageFound(true);
		// 		else setPageFound(false);
		// 	});
	}, [searchValue]);
	return (
		<>
			{pageFound ? (
				<div>Trade page</div>
			) : (
				<h2>Channel doesn't exists Please Try again</h2>
			)}
		</>
	);
};
export default withRouter(Trade);
