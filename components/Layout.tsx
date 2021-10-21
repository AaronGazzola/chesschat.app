import React from 'react';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Meta from '../components/Meta';
import NavBar from './NavBar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	setScreenDimensions();
	return (
		<main className='min-h-screen w-full max-w-4xl bg-gray-200 mx-auto relative'>
			<NavBar />
			<Meta />
			{props.children}
		</main>
	);
};

export default Layout;
