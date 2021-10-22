import React from 'react';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Meta from '../components/Meta';
import NavBar from './NavBar';
import { useAppSelector } from '../redux/hooks';
import { ChessBoard } from './ChessBoard';
import ChatBox from './ChatBox';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	setScreenDimensions();
	const { screenIsHorizontal, chessboardWidth } = useAppSelector(
		state => state.utils
	);
	return (
		<main className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
			<div
				className={`relative flex h-screen overflow-visible items-center justify-start w-full flex-nowrap
		${screenIsHorizontal ? 'flex-row pb-0 pl-16' : 'flex-col-reverse pb-10'}`}
				style={{
					maxWidth: screenIsHorizontal ? chessboardWidth * 2 + 138 : '',
					maxHeight: !screenIsHorizontal ? chessboardWidth * 2 + 60 : ''
				}}
			>
				<Meta />
				<NavBar />
				{props.children}
				<ChessBoard />
				<ChatBox />
			</div>
		</main>
	);
};

export default Layout;
