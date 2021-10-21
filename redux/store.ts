import { configureStore } from '@reduxjs/toolkit';
import utilsReducer from './utils/utils.slice';

export const store = configureStore({
	reducer: {
		utils: utilsReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
