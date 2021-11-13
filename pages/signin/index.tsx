import React, { SyntheticEvent, useState } from 'react';
import Input from '../../components/Input';
import PageLayout from '../../components/PageLayout';
import SVG from '../../components/SVG';

const Index = () => {
	const [page, setPage] = useState<string>('select');
	const [formState, setFormState] = useState({
		name: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		email: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		password: {
			isValid: false,
			isTouched: false,
			value: ''
		}
	} as { [index: string]: any });
	const { name, password, email } = formState;

	const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const id = e.currentTarget.id;
		const value = e.currentTarget.value;
		let isValid = id === 'email' ? /^\S+@\S+\.\S+$/.test(value) : !!value;
		setFormState(prev => ({
			...prev,
			[id]: {
				...prev[id],
				isValid,
				value
			}
		}));
	};
	const touchHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		const id = e.currentTarget.id;
		setFormState(prev => ({
			...prev,
			[id]: {
				...prev[id],
				isTouched: true
			}
		}));
	};
	return (
		<PageLayout>
			<div className={`flex flex-col items-center`}>
				{page === 'select' ? (
					<>
						<h1 className='title'>Sign in</h1>
						<div className='flex flex-col w-full max-w-xs p-2'>
							<button
								className='button-blue w-full flex justify-between py-2 mb-2'
								onClick={() => setPage('email-signin')}
							>
								<div className='w-6'></div>
								Email
								<SVG name='mail' classes='fill-current' />
							</button>
							<button className='button-blue w-full flex justify-between py-2 mb-2'>
								<div className='w-6'></div>
								Google
								<SVG name='google' classes='fill-current' />
							</button>
							<button
								className='button-blue-outline w-full flex justify-between py-2 mb-2'
								onClick={() => setPage('email-signup')}
							>
								<div className='w-6'></div>
								New email account
								<SVG name='mail' classes='fill-current' />
							</button>
						</div>
					</>
				) : (
					<>
						<h1 className='title'>
							{page === 'email-signin' ? 'Sign in' : 'New email account'}
						</h1>
						{page === 'email-signup' && (
							<div className='flex max-w-lg w-full items-center'>
								<Input
									type='text'
									placeholder='Name'
									label='Name'
									value={name.value}
									validation
									isValid={name.isValid}
									isTouched={name.isTouched}
									id='name'
									helperText={
										!name.isValid && name.isTouched
											? 'Please enter a unique user name'
											: ''
									}
									fullWidth
									onChange={changeHandler}
									touchHandler={touchHandler}
								/>
								<div className='w-10 h-10 mt-1 flex items-center justify-center overflow-hidden'>
									<SVG name='circle' classes='fill-current text-gray-500' />
								</div>
							</div>
						)}
						<Input
							type='text'
							placeholder='Email'
							label='Email'
							value={email.value}
							validation
							isValid={email.isValid}
							isTouched={email.isTouched}
							id='email'
							helperText={
								!email.isValid && email.isTouched
									? 'Please enter a valid email address'
									: ''
							}
							fullWidth
							onChange={changeHandler}
							touchHandler={touchHandler}
							containerClasses='w-full max-w-lg'
						/>
						<Input
							type='password'
							placeholder='Password'
							label='Password'
							value={password.value}
							validation
							isValid={password.isValid}
							isTouched={password.isTouched}
							id='password'
							helperText={
								!password.isValid && password.isTouched
									? 'Please enter a password'
									: ''
							}
							fullWidth
							onChange={changeHandler}
							touchHandler={touchHandler}
							containerClasses='w-full max-w-lg'
						/>
						<button
							className={`flex w-full items-center justify-center button-green max-w-lg py-2 mt-2 ${
								!email.isValid ||
								!password.isValid ||
								(page === 'email-signup' && !name.isValid)
									? 'disabled'
									: ''
							}`}
							onClick={() => setPage(prev => prev + 1)}
						>
							{page === 'email-signin' ? 'Sign in' : 'Sign up'}
						</button>
						<div className='w-full max-w-lg'>
							<button
								className='button-blue-outline border-none my-2 flex pl-0 py-0.5'
								onClick={() => setPage('select')}
							>
								<SVG
									name='arrow'
									classes='transform rotate-180 fill-current mr-2'
								/>
								Back
							</button>
						</div>
					</>
				)}
			</div>
		</PageLayout>
	);
};

export default Index;
