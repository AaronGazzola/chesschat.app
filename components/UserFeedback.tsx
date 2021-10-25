import React, { useCallback, useEffect } from 'react';
import { clearGameFeedback } from '../redux/game/game.slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const UserFeedback = () => {
	const dispatch = useAppDispatch();
	const { success: gameSuccess, error: gameError } = useAppSelector(
		state => state.game
	);
	const success = gameSuccess;
	const error = gameError;
	const clearFeedback = useCallback(() => {
		dispatch(clearGameFeedback());
	}, [dispatch]);

	useEffect(() => {
		const handleClickScreen = () => {
			if (success) clearFeedback();
		};
		document.addEventListener('mousedown', handleClickScreen);
		return () => document.removeEventListener('mousedown', handleClickScreen);
	}, [success, clearFeedback]);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (success && !error) {
			timer = setTimeout(() => {
				clearFeedback();
			}, 3000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [success, clearFeedback, error]);

	if (error) {
		return (
			<div
				className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30'
				style={{ background: 'rgba(0,0,0,0.5)' }}
			>
				<div className='max-w-sm w-full p-2'>
					<div className='shadow-md bg-gray-100 rounded-md w-full p-2'>
						<h1 className='text-red-800 font-semibold text-2xl p-2 px-4'>
							{error.title}
						</h1>
						<p className='text-gray-800 font-medium text-lg p-2 px-4'>
							{error.message}
						</p>
						<div className='flex w-full justify-between p-2 mt-2'>
							{error.retryTrigger && (
								<>
									<button className='button-blue'>Retry</button>
									<div className='w-8'></div>
								</>
							)}
							<button onClick={() => clearFeedback()} className='button-green'>
								OK
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	} else if (success) {
		return (
			<div className='fixed z-30 bottom-5 left-1/2 transform -translate-x-1/2 bg-green-700 rounded-md py-3 px-6'>
				<p className='text-white font-semibold text-lg'>{success}</p>
			</div>
		);
	} else {
		return <></>;
	}
};

export default UserFeedback;
