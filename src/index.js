import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const onRedirectCallback = appState => {
	// Use the router's history module to replace the url
	history.replace(appState?.returnTo || window.location.pathname);
};

ReactDOM.render(
	<React.StrictMode>
		<Router history={history}>
			<Auth0Provider
				domain={process.env.REACT_APP_AUTH0_DOMAIN}
				clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
				redirectUri={window.location.origin + '/dashboard'}
				onRedirectCallback={onRedirectCallback}>
				<App />
			</Auth0Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
