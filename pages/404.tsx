import { initializeApp } from 'firebase/app';
import React from 'react';
import PageLayout from '../components/PageLayout';

const _404 = () => {
	return (
		<PageLayout>
			<h1 className='title'>404: Page not found</h1>
			<p className='body text-center'>
				Hmm... The page you're looking for can't be found
			</p>
		</PageLayout>
	);
};

export default _404;
