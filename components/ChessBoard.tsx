import React, {
	MouseEventHandler,
	SyntheticEvent,
	TouchEventHandler,
	useEffect,
	useRef,
	useState
} from 'react';
import { useMounted } from '../hooks/useMounted';
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

interface XYPosition {
	left: number;
	top: number;
}
interface RowColumnPosition {
	row: number;
	column: number;
}

export const ChessBoard = (props: ChessBoardProps) => {
	const dispatch = useAppDispatch();
	const mounted = useMounted();
	const { screenWidth, screenHeight, screenIsHorizontal, chessboardWidth } =
		useAppSelector(state => state.utils);
	const { playerIsWhite } = useAppSelector(state => state.game);
	const chessBoardRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [resetBoard, setResetBoard] = useState<boolean>(true);
	const [fromPosition, setFromPosition] = useState<RowColumnPosition | null>(
		null
	);
	const [toPosition, setToPosition] = useState<RowColumnPosition | null>(null);
	const [ghostPosition, setGhostPosition] = useState<XYPosition>({
		left: 0,
		top: 0
	});
	const [dragging, setDragging] = useState<boolean>(false);

	let initialState = Array.from(Array(8).keys()).map(row =>
		Array.from(Array(8).keys()).map(column => Empty)
	);
	const [positions, setPositions] = useState<PieceID[][]>(initialState);

	const chessPieceWidth = (chessboardWidth / 8) * 0.6;

	const touchMoveHandler: TouchEventHandler<HTMLElement> = e => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		setGhostPosition({
			top: e.targetTouches[0].clientY - rect.top - 16 - chessPieceWidth / 2,
			left: e.targetTouches[0].clientX - rect.left - 16 - chessPieceWidth / 2
		});
	};
	const touchEndHandler: TouchEventHandler<HTMLElement> = e => {
		setDragging(false);
	};

	const touchStartHandler: TouchEventHandler<HTMLDivElement> = e => {
		if (!containerRef.current || !chessBoardRef.current) return;
		setDragging(true);
		const rect = containerRef.current.getBoundingClientRect();
		setFromPosition({
			row: Math.round(
				((e.targetTouches[0].clientY - rect.top - 16 - chessPieceWidth / 2) /
					chessboardWidth) *
					8
			),
			column: Math.round(
				((e.targetTouches[0].clientX - rect.left - 16 - chessPieceWidth / 2) /
					chessboardWidth) *
					8
			)
		});
		setGhostPosition({
			top: e.targetTouches[0].clientY - rect.top - 16 - chessPieceWidth / 2,
			left: e.targetTouches[0].clientX - rect.left - 16 - chessPieceWidth / 2
		});
	};

	const mouseDownHandler: MouseEventHandler<HTMLElement> = e => {
		if (!containerRef.current || !chessBoardRef.current) return;
		setDragging(true);
		const rect = containerRef.current.getBoundingClientRect();
		setFromPosition({
			row: Math.round(
				((e.clientY - rect.top - 16 - chessPieceWidth / 2) / chessboardWidth) *
					8
			),
			column: Math.round(
				((e.clientX - rect.left - 16 - chessPieceWidth / 2) / chessboardWidth) *
					8
			)
		});
		setGhostPosition({
			top: e.clientY - rect.top - 16 - chessPieceWidth / 2,
			left: e.clientX - rect.left - 16 - chessPieceWidth / 2
		});
		setDragging(true);
	};

	const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = e => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		setGhostPosition({
			top: e.clientY - rect.top - 16 - chessPieceWidth / 2,
			left: e.clientX - rect.left - 16 - chessPieceWidth / 2
		});
	};

	const mouseUpHandler: MouseEventHandler<HTMLDivElement> = e => {
		setDragging(false);
	};

	const resetBoardHandler = () => {
		let newPositions = [...positions];
		newPositions[0] = playerIsWhite ? blackFirstRow : whiteFirstRow;
		newPositions[1] = playerIsWhite ? blackPawnRow : whitePawnRow;
		newPositions[6] = !playerIsWhite ? blackPawnRow : whitePawnRow;
		newPositions[7] = !playerIsWhite ? blackFirstRow : whiteFirstRow;
		setPositions(newPositions);
	};

	useEffect(() => {
		if (chessBoardRef.current) {
			dispatch(setChessboardwidth(chessBoardRef.current.offsetWidth));
		}
	}, [chessBoardRef.current?.offsetWidth]);

	useEffect(() => {
		if (resetBoard) {
			setResetBoard(false);
			resetBoardHandler();
		}
	}, [playerIsWhite, resetBoard]);

	return (
		<>
			<div
				ref={containerRef}
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
					onTouchStart={touchStartHandler}
					onTouchMove={touchMoveHandler}
					onTouchEnd={touchEndHandler}
					onMouseDown={mouseDownHandler}
					onMouseMove={mouseMoveHandler}
					onMouseUp={mouseUpHandler}
					className='relative w-full flex-shrink-0'
					style={{
						paddingTop: '100%',
						cursor: dragging ? 'grab' : ''
					}}
				>
					{dragging && fromPosition && (
						<div
							className='absolute top-0 left-0 z-10'
							style={{
								width: chessPieceWidth,
								height: chessPieceWidth,
								transform: `translate(${ghostPosition.left}px, ${ghostPosition.top}px)`
							}}
						>
							<ChessPiece
								pieceID={positions[fromPosition.row][fromPosition.column]}
							/>
						</div>
					)}
					<div className='absolute top-0 left-0 right-0 bottom-0 flex flex-wrap'>
						{Array.from(Array(8).keys()).map(row => {
							return Array.from(Array(8).keys()).map(column => (
								<div
									key={`${row}X${column}`}
									className={`flex items-center justify-center ${
										row % 2 && column % 2
											? 'bg-orange'
											: !(row % 2) && !(column % 2)
											? 'bg-orange'
											: ''
									}`}
									style={{ width: '12.5%', height: '12.5%' }}
								>
									<div
										className={`${
											positions[row][column] === 'E' ? '' : 'cursor-pointer'
										} ${
											dragging &&
											fromPosition?.row === row &&
											fromPosition?.column === column
												? 'opacity-0'
												: ''
										}`}
										style={{ width: '60%', height: '60%' }}
									>
										<ChessPiece pieceID={positions[row][column]} />
									</div>
								</div>
							));
						})}
					</div>
				</div>
			</div>
		</>
	);
};
