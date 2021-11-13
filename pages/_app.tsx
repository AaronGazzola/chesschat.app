import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { initializeApp, getApps } from 'firebase/app';
import {
	getAuth,
	setPersistence,
	browserLocalPersistence
} from '@firebase/auth';

export const firebaseConfig = {
	apiKey: 'AIzaSyC04HBdLvuWLCliB6bFxhT2ul2J7LzRxjE',
	authDomain: 'chesschat-c19e1.firebaseapp.com',
	databaseURL: 'https://chesschat-c19e1-default-rtdb.firebaseio.com',
	projectId: 'chesschat-c19e1',
	storageBucket: 'chesschat-c19e1.appspot.com',
	messagingSenderId: '1031034209284',
	appId: '1:1031034209284:web:af95fd64d791d2bcbee151',
	measurementId: 'G-HTRZ8N51TY'
};

initializeApp(firebaseConfig);

const auth = getAuth();

const setPersist = async () => {
	await setPersistence(auth, browserLocalPersistence);
};

setPersist();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
export default MyApp;
