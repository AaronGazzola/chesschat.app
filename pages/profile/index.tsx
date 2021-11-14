import { onAuthStateChanged, signOut } from '@firebase/auth';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import SVG from '../../components/SVG';
import useFirebase from '../../hooks/useFirebase';
import { authError, authSuccess } from '../../redux/auth/auth.slice';
import { useAppDispatch } from '../../redux/hooks';

const Index = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { auth } = useFirebase();
	const [loading, setLoading] = useState<boolean>(false);

	const signoutHandler = async () => {
		setLoading(true);
		try {
			await signOut(auth);
			dispatch(authSuccess('You are now signed out'));
			router.push('/signin');
		} catch (error) {
			dispatch(authError(error));
		} finally {
			setLoading(false);
		}
	};

	// redirect to signin if not logged in
	useEffect(() => {
		if (!auth.currentUser) router.push('/signin');
	}, []);
	onAuthStateChanged(auth, user => {
		if (!user) router.push('/signin');
	});

	return (
		<PageLayout>
			<h1 className='title'>Profile</h1>
			<div className='w-full flex flex-col items-center'>
				<button
					className='button-blue-outline flex justify-between py-2 mb-2'
					onClick={signoutHandler}
				>
					{loading ? (
						<div style={{ animation: 'loading-spin 2s linear infinite' }}>
							<SVG name='loading' classes='fill-current w-6 h-6' />
						</div>
					) : (
						<>
							<div className='w-6'></div>
							Sign out
							<SVG name='door' classes='fill-current ml-3' />
						</>
					)}
				</button>
			</div>
		</PageLayout>
	);
};

export default Index;
