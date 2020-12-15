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

export const selectLoginReducer = (state: any) => {
  return state.loginReducer;
};

export const {
  setLoginRole,
} = actions;

export default reducer;
