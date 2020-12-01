import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    loginRole: '',
  },
  reducers: {
    setLoginRole(state, { payload }) {
      return { ...state, loginRole: payload };
    },
  },
});

export const {
  setLoginRole,
} = actions;

export default reducer;
