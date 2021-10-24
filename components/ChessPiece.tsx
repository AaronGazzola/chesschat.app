import React, { useState } from 'react';
import { PieceID } from './ChessBoard';
import SVG from './SVG';

interface ChessPieceProps {
	pieceID: PieceID;
}

const ChessPiece = (props: ChessPieceProps) => {
	const { pieceID } = props;
	const getName = (pieceId: PieceID): string => {
		switch (pieceID) {
			case 'WK':
				return 'whiteKing';
			case 'BK':
				return 'blackKing';
			case 'WQ':
				return 'whiteQueen';
			case 'BQ':
				return 'blackQueen';
			case 'WB':
				return 'whiteBishop';
			case 'BB':
				return 'blackBishop';
			case 'WH':
				return 'whiteKnight';
			case 'BH':
				return 'blackKnight';
			case 'WC':
				return 'whiteCastle';
			case 'BC':
				return 'blackCastle';
			case 'WP':
				return 'whitePawn';
			case 'BP':
				return 'blackPawn';
			case 'P':
				return 'circle';
			default:
				return '';
		}
	};
	if (pieceID === 'E') {
		return <></>;
	} else if (pieceID === 'P') {
		return (
			<SVG
				name={getName(pieceID)}
				classes='fill-current text-blue-dark w-11/2 h-11/12'
			/>
		);
	} else {
		return (
			<SVG
				name={getName(pieceID)}
				classes='fill-current text-blue-dark w-full h-full'
			/>
		);
	}
};

export default ChessPiece;
