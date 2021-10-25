import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './game.interface';

const initialState: GameState = {
	playerIsWhite: true
};

const gameSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		clearGameFeedback(state) {
			state.success = null;
			state.error = null;
		}
	}
});

export const { clearGameFeedback } = gameSlice.actions;

export default gameSlice.reducer;
