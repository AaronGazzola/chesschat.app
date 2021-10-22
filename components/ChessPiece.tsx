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
			default:
				return '';
		}
	};
	if (pieceID === 'E') {
		return <></>;
	} else {
		return (
			<SVG
				name={getName(pieceID)}
				classes='fill-current text-blue-dark'
				style={{ width: '60%', height: '60%' }}
			/>
		);
	}
};

export default ChessPiece;
