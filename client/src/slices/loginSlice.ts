import { createSlice } from '@reduxjs/toolkit';

import { loginRiderQuery, loginDriverQuery } from '../queries/login';

const { actions, reducer } = createSlice({
  name: 'login',
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

export const requestLogin = (client: any, history: any, riderCheck : boolean) => async (dispatch: any, getState : any) => {
  const { loginField } = getState().loginReducer;
  const { data } = await client.mutate({
    mutation: riderCheck ? loginRiderQuery : loginDriverQuery,
    variables: { ...loginField },
    fetchPolicy: 'no-cache',
  });

  const { message, name, role, success, token } = riderCheck ? data.loginRider : data.loginDriver;
  if (success) {
    localStorage.setItem('token', token);
    riderCheck ? history.push('/setcourse') : history.push('/signup/select');
  } else {
    window.alert(message);
  }
};

export const {
  setLoginEmail,
  setLoginPassword,
} = actions;

export default reducer;
