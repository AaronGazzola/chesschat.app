import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setChessboardwidth } from '../redux/utils/utils.slice';
import ChessPiece from './ChessPiece';

interface ChessBoardProps {}

export enum PieceID {
	WhiteKing = 'WK',
	WhiteQueen = 'WQ',
	WhiteBishop = 'WB',
	WhiteKnight = 'WH',
	WhiteCastle = 'WC',
	WhitePawn = 'WP',
	BlackKing = 'BK',
	BlackQueen = 'BQ',
	BlackBishop = 'BB',
	BlackKnight = 'BH',
	BlackCastle = 'BC',
	BlackPawn = 'BP',
	Empty = 'E'
}
const {
	WhiteKing,
	WhiteQueen,
	WhiteBishop,
	WhiteKnight,
	WhiteCastle,
	WhitePawn,
	BlackKing,
	BlackQueen,
	BlackBishop,
	BlackKnight,
	BlackCastle,
	BlackPawn,
	Empty
} = PieceID;

const whiteFirstRow: PieceID[] = [
	WhiteCastle,
	WhiteKnight,
	WhiteBishop,
	WhiteQueen,
	WhiteKing,
	WhiteBishop,
	WhiteKnight,
	WhiteCastle
];
const blackFirstRow: PieceID[] = [
	BlackCastle,
	BlackKnight,
	BlackBishop,
	BlackQueen,
	BlackKing,
	BlackBishop,
	BlackKnight,
	BlackCastle
];
const blackPawnRow: PieceID[] = Array.from(Array(8).keys()).map(
	square => BlackPawn
);
const whitePawnRow: PieceID[] = Array.from(Array(8).keys()).map(
	square => WhitePawn
);

export const ChessBoard = (props: ChessBoardProps) => {
	const dispatch = useAppDispatch();
	const { screenWidth, screenHeight, screenIsHorizontal } = useAppSelector(
		state => state.utils
	);
	const { playerIsWhite } = useAppSelector(state => state.game);
	const chessBoardRef = useRef<HTMLDivElement>(null);
	const [resetBoard, setResetBoard] = useState<boolean>(true);

	let initialState = Array.from(Array(8).keys()).map(row =>
		Array.from(Array(8).keys()).map(column => Empty)
	);
	const [positions, setPositions] = useState<PieceID[][]>(initialState);

	useEffect(() => {
		if (chessBoardRef.current) {
			dispatch(setChessboardwidth(chessBoardRef.current.offsetWidth));
		}
	}, [chessBoardRef.current?.offsetWidth]);

	useEffect(() => {
		if (resetBoard) {
			setResetBoard(false);
			let newPositions = [...positions];
			newPositions[0] = playerIsWhite ? blackFirstRow : whiteFirstRow;
			newPositions[1] = playerIsWhite ? blackPawnRow : whitePawnRow;
			newPositions[6] = !playerIsWhite ? blackPawnRow : whitePawnRow;
			newPositions[7] = !playerIsWhite ? blackFirstRow : whiteFirstRow;
			setPositions(newPositions);
		}
	}, [playerIsWhite, resetBoard]);

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
						return Array.from(Array(8).keys()).map(column => (
							<div
								key={`$${row}X${column}`}
								className={` flex items-center justify-center ${
									row % 2 && column % 2
										? 'bg-orange'
										: !(row % 2) && !(column % 2)
										? 'bg-orange'
										: ''
								}`}
								style={{ width: '12.5%', height: '12.5%' }}
							>
								<ChessPiece pieceID={positions[row][column]} />
							</div>
						));
					})}
				</div>
			</div>
		</div>
	);
};
