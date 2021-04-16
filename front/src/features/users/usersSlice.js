import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
  },
  reducers: {
    updateUsers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUsers } = usersSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsers = state => state.users.value;


export default usersSlice.reducer;
