import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import './assets/css/style.css';

const container = document.getElementById('root') as any;
const root = ReactDOMClient.createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
		,
	</React.StrictMode>
);

reportWebVitals();
