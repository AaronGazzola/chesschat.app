import { configureStore } from '@reduxjs/toolkit';
import utilsReducer from './utils/utils.slice';
import gameReducer from './game/game.slice';

export const store = configureStore({
	reducer: {
		utils: utilsReducer,
		game: gameReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
