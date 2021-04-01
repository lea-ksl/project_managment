import { createSlice } from '@reduxjs/toolkit';

export const polesSlice = createSlice({
  name: 'poles',
  initialState: {
    value: [],
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = polesSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPoles = state => state.poles.value;


export default polesSlice.reducer;
