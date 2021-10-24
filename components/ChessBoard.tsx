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
	x: number;
	y: number;
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
		x: 0,
		y: 0
	});
	const [dragging, setDragging] = useState<boolean>(false);

	let initialState = Array.from(Array(8).keys()).map(row =>
		Array.from(Array(8).keys()).map(column => Empty)
	);
	const [positions, setPositions] = useState<PieceID[][]>(initialState);

	const squareWidth = chessboardWidth / 8;
	const chessPieceWidth = squareWidth * 0.6;

	const getXYPosition = (x: number, y: number): XYPosition => {
		if (!containerRef.current || !chessBoardRef.current)
			return { x: -1, y: -1 };
		const rect = containerRef.current.getBoundingClientRect();
		return {
			x: x - rect.left - 16 - chessPieceWidth / 2,
			y: y - rect.top - 16 - chessPieceWidth / 2
		};
	};
	const getRowColumnPosition = (x: number, y: number): RowColumnPosition => {
		if (!containerRef.current || !chessBoardRef.current)
			return { row: -1, column: -1 };
		const rect = containerRef.current.getBoundingClientRect();
		return {
			row: Math.floor((y - rect.top - 16) / squareWidth),
			column: Math.floor((x - rect.left - 16) / squareWidth)
		};
	};

	const touchStartHandler: TouchEventHandler<HTMLDivElement> = e => {
		setDragging(true);
		setFromPosition(
			getRowColumnPosition(
				e.targetTouches[0].clientX,
				e.targetTouches[0].clientY
			)
		);
		setGhostPosition(
			getXYPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
		);
	};

	const touchMoveHandler: TouchEventHandler<HTMLElement> = e => {
		setGhostPosition(
			getXYPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
		);
	};
	const touchEndHandler: TouchEventHandler<HTMLElement> = e => {
		setDragging(false);
	};

	const mouseDownHandler: MouseEventHandler<HTMLElement> = e => {
		setDragging(true);
		setFromPosition(getRowColumnPosition(e.clientX, e.clientY));
		setGhostPosition(getXYPosition(e.clientX, e.clientY));
	};

	const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = e => {
		setGhostPosition(getXYPosition(e.clientX, e.clientY));
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
						paddingTop: '100%'
					}}
				>
					{dragging && fromPosition && (
						<div
							className='absolute top-0 left-0 z-10'
							style={{
								width: chessPieceWidth,
								height: chessPieceWidth,
								transform: `translate(${ghostPosition.x}px, ${ghostPosition.y}px)`
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
									style={{
										width: '12.5%',
										height: '12.5%',
										cursor:
											positions[row][column] === 'E'
												? 'default'
												: dragging
												? 'grabbing'
												: 'grab'
									}}
								>
									<div
										className={`${
											dragging &&
											fromPosition?.row === row &&
											fromPosition?.column === column
												? 'opacity-0'
												: ''
										}`}
										style={{
											width: '60%',
											height: '60%'
										}}
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
