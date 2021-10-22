import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import SVG from '../components/SVG';
import { toggleChatIsOpen } from '../redux/utils/utils.slice';
import { useMounted } from '../hooks/useMounted';
import { useDeviceIsTouch } from '../hooks/useDeviceIsTouch';

const NavBar = () => {
	const dispatch = useAppDispatch();
	const {
		screenWidth,
		screenHeight,
		screenIsHorizontal,
		chatIsOpen,
		chessboardWidth
	} = useAppSelector(state => state.utils);
	const deviceIsTouch = useDeviceIsTouch();

	const clickhandler = (name: string) => {
		if (name === 'chat' || chatIsOpen) dispatch(toggleChatIsOpen());
	};

	return (
		<div
			className={`absolute bg-blue flex shadow-sm transform   
      ${
				screenIsHorizontal
					? 'top-1/2 left-3 rounded-lg flex-col py-2 px-1 -translate-y-1/2 sm:translate-x-0'
					: 'top-full left-1/2 rounded-t-lg px-2 pt-1 -translate-y-full -translate-x-1/2'
			}`}
		>
			{['userCircle', 'users', 'chart', 'pulse', 'chat'].map(name => {
				if (
					(screenIsHorizontal &&
						screenWidth > chessboardWidth * 2 + 138 &&
						name === 'chat') ||
					(!screenIsHorizontal &&
						screenHeight > chessboardWidth * 2 + 128 &&
						name === 'chat')
				)
					return <React.Fragment key={name}></React.Fragment>;
				return (
					<div
						className={`m-0.5 p-0.5 sm:p-1.5 rounded-full ${
							!deviceIsTouch ? 'group hover:bg-gray-100' : ''
						} ${chatIsOpen && name === 'chat' ? 'bg-gray-100' : ''}`}
						key={name}
						onClick={() => clickhandler(name)}
					>
						<SVG
							name={name}
							classes={`rounded-full fill-current ${
								chatIsOpen && name === 'chat' ? 'text-blue' : 'text-white'
							} group-hover:text-blue`}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default NavBar;
