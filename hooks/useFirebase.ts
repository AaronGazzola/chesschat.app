import { useAppDispatch } from './../redux/hooks';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { setIsAuth, setUser } from '../redux/auth/auth.slice';

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
	const dispatch = useAppDispatch();
	const apps = getApps();
	if (!apps.length) initializeApp(firebaseConfig);

	const auth = getAuth();

	onAuthStateChanged(auth, user => {
		dispatch(setIsAuth(!!user));
	});

	return { auth };
};

export default useFirebase;
