import { getDatabase, ref } from '@firebase/database';
import { useDatabaseSnapshot } from '@react-query-firebase/database';
import { useState, useEffect } from 'react';

const useCheckNameAvailability = () => {
	const database = getDatabase();

	const [nameAvailability, setNameAvailability] = useState<
		'available' | 'unavailable' | 'unknown'
	>('unknown');
	const dbRef = ref(database, 'users/');
	const users = useDatabaseSnapshot(['users'], dbRef);
	const snapshot = users.data;
	let userNames: string[] = [];
	snapshot?.forEach((childSnapshot: any) => {
		userNames.push(childSnapshot.val().name);
	});
	const loadingNames = snapshot?.size !== userNames.length;
	const checkNameAvailability = (name: string) => {
		console.log(userNames);
		const foundName = userNames.find(
			userName => userName.toLocaleLowerCase() === name.toLocaleLowerCase()
		);
		setNameAvailability(
			!userNames.length || !name
				? 'unknown'
				: foundName
				? 'unavailable'
				: 'available'
		);
	};

	return { checkNameAvailability, nameAvailability, loadingNames };
};

export default useCheckNameAvailability;
