import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilsState {
	breakpoint: string;
	screenWidth: number;
	screenHeight: number;
	headerHeight: number;
	footerHeight: number;
	minDrawerWidth: number;
	maxDrawerWidth: number;
	chessboardWidth: number;
	screenIsHorizontal: boolean;
	chatIsOpen: boolean;
	deviceIsTouch: boolean;
}

const initialState: UtilsState = {
	breakpoint: 'xs',
	screenWidth: 0,
	screenHeight: 0,
	headerHeight: 56,
	footerHeight: 112,
	minDrawerWidth: 36,
	maxDrawerWidth: 147,
	chessboardWidth: 0,
	screenIsHorizontal: true,
	chatIsOpen: false,
	deviceIsTouch: false
};

const utilsSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		setDimensions: (state, action) => (state = { ...state, ...action.payload }),
		setChessboardwidth(state, action) {
			state.chessboardWidth = action.payload;
		},
		toggleChatIsOpen(state) {
			state.chatIsOpen = !state.chatIsOpen;
		},
		setDeviceIstouch(state, action) {
			state.deviceIsTouch = action.payload;
		}
	}
});

export const {
	setDimensions,
	setChessboardwidth,
	toggleChatIsOpen,
	setDeviceIstouch
} = utilsSlice.actions;

export default utilsSlice.reducer;
