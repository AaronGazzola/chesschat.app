import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from '@firebase/auth';

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

const useFirebase = () => {
	const apps = getApps();
	if (!apps.length) initializeApp(firebaseConfig);
	const auth = getAuth();
	return { auth };
};

export default useFirebase;
