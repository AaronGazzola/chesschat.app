import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import SVG from '../components/SVG';
import { toggleChatIsOpen } from '../redux/utils/utils.slice';
import { useIsTouch } from '../hooks/useIsTouch';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const navList = [
	{ href: '/signin', name: 'userCircle' },
	{ href: '/friends', name: 'users' },
	{ href: '/stats', name: 'chart' },
	{ href: '/games', name: 'pulse' },
	{ href: '', name: 'chat' }
];

const NavBar = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {
		screenWidth,
		screenHeight,
		screenIsHorizontal,
		chatIsOpen,
		chessboardWidth
	} = useAppSelector(state => state.utils);
	const isTouch = useIsTouch();

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
			{navList.map(item => {
				if (
					(screenIsHorizontal &&
						screenWidth > chessboardWidth * 2 + 100 &&
						item.name === 'chat') ||
					(!screenIsHorizontal &&
						screenHeight > chessboardWidth * 2 + 60 &&
						item.name === 'chat')
				)
					return <React.Fragment key={item.name}></React.Fragment>;
				return (
					<Link href={item.href} key={item.name}>
						<button
							className={`m-0.5 p-0.5 sm:p-1.5 rounded-full ${
								!isTouch ? 'group hover:bg-gray-100' : ''
							} ${
								(chatIsOpen && item.name === 'chat') ||
								router.pathname === item.href
									? 'bg-gray-100'
									: ''
							}`}
							onClick={() => clickhandler(item.name)}
						>
							<SVG
								name={item.name}
								classes={`rounded-full fill-current ${
									(chatIsOpen && item.name === 'chat') ||
									router.pathname === item.href
										? 'text-blue'
										: 'text-white'
								} group-hover:text-blue`}
							/>
						</button>
					</Link>
				);
			})}
		</div>
	);
};

export default NavBar;
