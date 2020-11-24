import { createSlice } from '@reduxjs/toolkit';

import { loginRider } from './queries/login';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    loginField: {
      email: '',
      password: '',
    },
  },
  reducers: {
    setLoginEmail(state, { payload: email }) {
      return { ...state, loginField: { ...state.loginField, email } };
    },
    setLoginPassword(state, { payload: password }) {
      return { ...state, loginField: { ...state.loginField, password } };
    },
  },
});

export const requestLogin = (client: any) => async (dispatch: any, getState : any) => {
  const { loginField } = getState();
  const { data } = await client.mutate({
    mutation: loginRider(loginField.email, loginField.password),
    fetchPolicy: 'cache-first',
  });
};

export const { setLoginEmail, setLoginPassword } = actions;

export default reducer;
