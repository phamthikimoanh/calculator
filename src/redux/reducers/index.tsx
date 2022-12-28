import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './historyReducer';

export const rootReducer = configureStore({
	reducer: {
		history: historyReducer,
	},
});
