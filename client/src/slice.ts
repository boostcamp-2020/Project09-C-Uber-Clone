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
    mutation: loginRider,
    variables: { ...loginField },
    fetchPolicy: 'no-cache',
  });
  console.log(data); //로그인한 유저의 id
};

export const { setLoginEmail, setLoginPassword } = actions;

export default reducer;
