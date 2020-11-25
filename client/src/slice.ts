import { createSlice } from '@reduxjs/toolkit';

import { loginRider } from './queries/login';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    loginField: {
      email: '',
      password: '',
    },
    riderSignUpField: {
      name: '',
      phoneNumber: '',
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
    setRiderSignUpName(state, { payload: name }) {
      console.log('state :', JSON.stringify(state));
      return { ...state, riderSignUpField: { ...state.riderSignUpField, name } };
    },
    setRiderSignUpPhoneNumber(state, { payload: phoneNumber }) {
      return { ...state, riderSignUpField: { ...state.riderSignUpField, phoneNumber } };
    },
    setRiderSignUpEmail(state, { payload: email }) {
      return { ...state, riderSignUpField: { ...state.riderSignUpField, email } };
    },
    setRiderSignUpPassword(state, { payload: password }) {
      return { ...state, riderSignUpField: { ...state.riderSignUpField, password } };
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

export const requestRiderSignUp = (client: any) => async (dispatch: any, getState : any) => {
  const { riderSignUpField } = getState();
};

export const {
  setLoginEmail,
  setLoginPassword,
  setRiderSignUpEmail,
  setRiderSignUpName,
  setRiderSignUpPassword,
  setRiderSignUpPhoneNumber,
} = actions;

export default reducer;
