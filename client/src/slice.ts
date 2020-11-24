import { createSlice } from '@reduxjs/toolkit';

import { loginRider, loginDriver } from './queries/login';

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

export const requestLogin = (client: any, riderCheck : boolean) => async (dispatch: any, getState : any) => {
  const { loginField } = getState();
  const { data } = await client.mutate({
    mutation: riderCheck ? loginRider(loginField.email, loginField.password) : loginDriver(loginField.email, loginField.password),
    fetchPolicy: 'cache-first',
  });
};

export const { setLoginEmail, setLoginPassword } = actions;

export default reducer;
