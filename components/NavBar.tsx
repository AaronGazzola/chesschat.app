import React from 'react';
import { useAppSelector } from '../redux/hooks';
import SVG from '../components/SVG';

const NavBar = () => {
	const { screenWidth } = useAppSelector(state => state.utils);
	return (
		<div
			className={`absolute top-full sm:top-1/2 left-1/2 sm:left-3 bg-blue sm:rounded-lg rounded-t-lg flex sm:flex-col shadow-sm px-2 pt-1 sm:py-2 sm:px-1 transform -translate-y-full sm:-translate-y-1/2 -translate-x-1/2 sm:translate-x-0`}
		>
			{['userCircle', 'users', 'chart', 'pulse', 'chat'].map(name => (
				<SVG
					key={name}
					name={name}
					classes='fill-current text-white m-1 mx-1.5 sm:m-2'
				/>
			))}
		</div>
	);
};

export default NavBar;
