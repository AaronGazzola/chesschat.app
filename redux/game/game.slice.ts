import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
	playerIsWhite: boolean;
}

const initialState: GameState = {
	playerIsWhite: true
};

const gameSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {}
});

export default gameSlice.reducer;
