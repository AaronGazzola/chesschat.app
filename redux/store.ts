import { configureStore } from '@reduxjs/toolkit';
import utilsReducer from './utils/utils.slice';
import gameReducer from './game/game.slice';
import authReducer from './auth/auth.slice';

export const store = configureStore({
	reducer: {
		utils: utilsReducer,
		game: gameReducer,
		auth: authReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
