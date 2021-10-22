import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setChessboardwidth } from '../redux/utils/utils.slice';

interface ChessBoardProps {}

export const ChessBoard = (props: ChessBoardProps) => {
	const dispatch = useAppDispatch();
	const { screenWidth, screenHeight, screenIsHorizontal } = useAppSelector(
		state => state.utils
	);
	const chessBoardRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chessBoardRef.current) {
			console.log(
				'dispatch chessboard width',
				chessBoardRef.current.offsetWidth
			);
			dispatch(setChessboardwidth(chessBoardRef.current.offsetWidth));
		}
	}, [chessBoardRef.current?.offsetWidth]);

	return (
		<div
			className={`p-2 sm:p-4 w-full flex-shrink-0`}
			style={{
				maxWidth:
					screenWidth < screenHeight + (screenIsHorizontal ? 102 : 90)
						? screenHeight - (screenIsHorizontal ? 102 : 90)
						: screenHeight
			}}
		>
			<div
				ref={chessBoardRef}
				className='relative w-full flex-shrink-0'
				style={{
					paddingTop: '100%'
				}}
			>
				<div className='absolute top-0 left-0 right-0 bottom-0 flex flex-wrap'>
					{Array.from(Array(8).keys()).map(row => {
						return Array.from(Array(8).keys()).map(square => (
							<div
								key={square}
								className={` ${
									row % 2 && square % 2
										? 'bg-orange'
										: !(row % 2) && !(square % 2)
										? 'bg-orange'
										: ''
								}`}
								style={{ width: '12.5%', height: '12.5%' }}
							></div>
						));
					})}
				</div>
			</div>
		</div>
	);
};
