import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    clearCurrentUser: (state) => {
      return {
        ...state,
        currentUser: null,
      };
    },
  },
});

export const { setCurrentUser, clearCurrentUser} = userSlice.actions;

export default userSlice.reducer;