import { createSlice } from '@reduxjs/toolkit';

import { loginRiderQuery, loginDriverQuery } from './queries/login';

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
    driverSignUpField: {
      name: '',
      phoneNumber: '',
      email: '',
      rePassword: '',
      password: '',
      carType: '',
      carNumber: '',
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
    setDriverSignUpName(state, { payload: name }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, name } };
    },
    setDriverSignUpPhoneNumber(state, { payload: phoneNumber }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, phoneNumber } };
    },
    setDriverSignUpEmail(state, { payload: email }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, email } };
    },
    setDriverSignUpPassword(state, { payload: password }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, password } };
    },
    setDriverSignUpRePassword(state, { payload: rePassword }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, rePassword } };
    },
    setDriverSignUpCarType(state, { payload: carType }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, carType } };
    },
    setDriverSignUpCarNumber(state, { payload: carNumber }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, carNumber } };
    },
  },
});

export const requestLogin = (client: any, riderCheck : boolean) => async (dispatch: any, getState : any) => {
  const { loginField } = getState();
  const { data } = await client.mutate({
    mutation: riderCheck ? loginRiderQuery : loginDriverQuery,
    variables: { ...loginField },
    fetchPolicy: 'no-cache',
  });

  const { message, name, role, success, token } = riderCheck ? data.loginRider : data.loginDriver;
  if (success) {
    localStorage.setItem('token', token);
  } else {
    window.alert(message);
  }
};

export const requestRiderSignUp = (client: any) => async (dispatch: any, getState : any) => {
  const { riderSignUpField } = getState();
};

export const requestDriverSignUp = (client: any) => async (dispatch: any, getState : any) => {
  const { driverSignUpField } = getState();
};

export const {
  setLoginEmail,
  setLoginPassword,
  setRiderSignUpEmail,
  setRiderSignUpName,
  setRiderSignUpPassword,
  setRiderSignUpPhoneNumber,
  setDriverSignUpName,
  setDriverSignUpPhoneNumber,
  setDriverSignUpEmail,
  setDriverSignUpPassword,
  setDriverSignUpRePassword,
  setDriverSignUpCarNumber,
  setDriverSignUpCarType,
} = actions;

export default reducer;
