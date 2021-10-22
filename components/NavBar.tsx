import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import SVG from '../components/SVG';
import { toggleChatIsOpen } from '../redux/utils/utils.slice';

const NavBar = () => {
	const dispatch = useAppDispatch();
	const {
		screenWidth,
		screenHeight,
		screenIsHorizontal,
		chatIsOpen,
		chessboardWidth
	} = useAppSelector(state => state.utils);

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
						className={`m-0.5 p-0.5 sm:p-1.5 rounded-full group hover:bg-blue-light ${
							chatIsOpen && name === 'chat' ? 'bg-blue-light' : ''
						}`}
						key={name}
						onClick={() => clickhandler(name)}
					>
						<SVG
							name={name}
							classes={`rounded-full fill-current ${
								chatIsOpen && name === 'chat' ? 'text-blue-dark' : 'text-white'
							} group-hover:text-blue-dark`}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default NavBar;
