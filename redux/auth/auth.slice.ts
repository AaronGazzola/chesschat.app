import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.interface';

const initialState: AuthState = {
	loading: true
};

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
		},
		setUserName(state, action) {
			state.userName = action.payload;
		},
		setAuthLoading(state, action) {
			state.loading = action.payload;
		}
	}
});

export const {
	clearAuthFeedback,
	authSuccess,
	authError,
	setIsAuth,
	setUserName,
	setAuthLoading
} = gameSlice.actions;

export default gameSlice.reducer;
