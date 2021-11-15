import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/animations.css';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyC04HBdLvuWLCliB6bFxhT2ul2J7LzRxjE',
	authDomain: 'chesschat-c19e1.firebaseapp.com',
	databaseURL: 'https://chesschat-c19e1-default-rtdb.firebaseio.com',
	projectId: 'chesschat-c19e1',
	storageBucket: 'chesschat-c19e1.appspot.com',
	messagingSenderId: '1031034209284',
	appId: '1:1031034209284:web:af95fd64d791d2bcbee151',
	measurementId: 'G-HTRZ8N51TY'
};

function MyApp({ Component, pageProps }: AppProps) {
	initializeApp(firebaseConfig);
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
export default MyApp;
