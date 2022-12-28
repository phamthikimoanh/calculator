import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
	[key: string]: string;
}

// Define the initial state using that type
const initialState: CounterState = {};
let currentKey = 1;
export const historySlice = createSlice({
	name: 'history',
	initialState,
	reducers: {
		saveCalculation: (state, payload) => {
			const newValue = {
				...state,
				...{ ['key' + currentKey]: payload.payload },
			};
			currentKey = currentKey + 1;
			return newValue;
		},
	},
});

export const { saveCalculation } = historySlice.actions;

export default historySlice.reducer;
