import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { get, getDatabase, ref } from '@firebase/database';
import { useRouter } from 'next/dist/client/router';
import {
	setAuthLoading,
	setIsAuth,
	setUserName
} from '../redux/auth/auth.slice';
import { useAppDispatch } from './../redux/hooks';
const useFirebaseAuth = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const database = getDatabase();

	onAuthStateChanged(auth, async user => {
		if (user) {
			dispatch(setIsAuth(true));
			dispatch(setAuthLoading(true));
			const snapshot = await get(ref(database, `users/${user.uid}/name`));
			if (snapshot.exists()) {
				console.log(snapshot.val());
				dispatch(setUserName(snapshot.val()));
			}
			dispatch(setAuthLoading(false));
		} else {
			dispatch(setIsAuth(false));
			dispatch(setAuthLoading(false));
		}
	});
};

export default useFirebaseAuth;
