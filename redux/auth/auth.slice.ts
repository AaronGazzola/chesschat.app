import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.interface';

const initialState: AuthState = {};

const gameSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		clearAuthFeedback(state) {
			state.success = null;
			state.error = null;
		},
		authSuccess(state, action) {
			state.success = action.payload;
		},
		authError(state, action) {
			state.error = action.payload;
		},
		setIsAuth(state, action) {
			state.isAuth = action.payload;
		}
	}
});

export const { clearAuthFeedback, authSuccess, authError, setIsAuth } =
	gameSlice.actions;

export default gameSlice.reducer;
