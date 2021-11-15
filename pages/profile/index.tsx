import { getAuth, signOut } from '@firebase/auth';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import SVG from '../../components/SVG';
import { authError, authSuccess } from '../../redux/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Index = () => {
	const router = useRouter();
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const {
		isAuth,
		userName,
		loading: authIsLoading
	} = useAppSelector(state => state.auth);
	const [signoutLoading, setSignoutLoading] = useState<boolean>(false);

	const signoutHandler = async () => {
		setSignoutLoading(true);
		try {
			await signOut(auth);
			dispatch(authSuccess('You are now signed out'));
			router.push('/signin');
		} catch (error) {
			dispatch(authError(error));
		} finally {
			setSignoutLoading(false);
		}
	};

	// redirect to signin if not logged in
	useEffect(() => {
		if (!isAuth && !authIsLoading) router.push('/signin');
	}, [isAuth, authIsLoading, router]);

	return (
		<PageLayout>
			<h1 className='title'>Profile</h1>
			<div className='w-full flex flex-col items-center'>
				{authIsLoading ? (
					<div className='overflow-hidden p-2 pb-4'>
						<div style={{ animation: 'loading-spin 2s linear infinite' }}>
							<SVG name='loading' classes='text-blue fill-current w-6 h-6' />
						</div>
					</div>
				) : (
					<></>
				)}
				<button
					className='button-blue-outline flex justify-between py-2 mb-2'
					onClick={signoutHandler}
				>
					{signoutLoading ? (
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
