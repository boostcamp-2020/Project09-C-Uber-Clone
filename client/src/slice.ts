import { createSlice } from '@reduxjs/toolkit';


const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    loginIdInput: '',
    loginPasswordInput: '',
  },
  reducers: {
    setLoginIdInput(state, { payload }) {
      return payload;
    },
    setLoginPasswordInput(state, { payload }) {
      return payload;
    },
  },
});

export const { setLoginIdInput, setLoginPasswordInput } = actions;

export default reducer;
