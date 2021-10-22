import React, { useRef } from 'react';
import { useAppSelector } from '../redux/hooks';

const ChatBox = () => {
	const {
		screenWidth,
		screenHeight,
		chessboardWidth,
		screenIsHorizontal,
		chatIsOpen
	} = useAppSelector(state => state.utils);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	return (
		<div
			ref={chatContainerRef}
			className={`relative overflow-visible flex-grow`}
			style={{
				height: screenIsHorizontal ? chessboardWidth : '',
				width: !screenIsHorizontal ? chessboardWidth : '',
				minHeight: screenIsHorizontal ? 50 : '',
				minWidth: !screenIsHorizontal ? '' : 50
			}}
		>
			<div
				className={`shadow-md border-2 border-gray-300 rounded-md absolute bg-gray-100 ${
					screenIsHorizontal
						? 'bottom-0 top-0 left-3'
						: 'bottom-0 left-0 right-0'
				}`}
				style={{
					height: chessboardWidth,
					width: chessboardWidth,
					transition: 'transform 1s ease',
					transform:
						chatIsOpen && screenIsHorizontal && chatContainerRef.current
							? `translateX(-${
									chessboardWidth - chatContainerRef.current.offsetWidth < 0
										? 0
										: chessboardWidth - chatContainerRef.current.offsetWidth
							  }px)`
							: chatIsOpen && !screenIsHorizontal && chatContainerRef.current
							? `translateY(${
									chessboardWidth - chatContainerRef.current.offsetHeight < 0
										? 0
										: chessboardWidth - chatContainerRef.current.offsetHeight
							  }px)`
							: ''
				}}
			></div>
		</div>
	);
};

export default ChatBox;
