import { createSlice } from '@reduxjs/toolkit';

import { loginRider, loginDriver } from './queries/login';
import { signUpDriver, signUpRider } from './queries/signup';

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
      rePassword: '',
    },
    driverSignUpField: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      rePassword: '',
      carType: '',
      plateNumber: '',
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
    setRiderSignUpRePassword(state, { payload: rePassword }) {
      return { ...state, riderSignUpField: { ...state.riderSignUpField, rePassword } };
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
    setDriverSignUpPlateNumber(state, { payload: plateNumber }) {
      return { ...state, driverSignUpField: { ...state.driverSignUpField, plateNumber } };
    },
  },
});

export const requestLogin = (client: any, riderCheck : boolean) => async (dispatch: any, getState : any) => {
  const { loginField } = getState();
  const { data } = await client.mutate({
    mutation: riderCheck ? loginRider : loginDriver,
    variables: { ...loginField },
    fetchPolicy: 'no-cache',
  });
  console.log(data); //로그인한 유저의 id
};

export const requestRiderSignUp = (client: any) => async (dispatch: any, getState : any) => {
  const { riderSignUpField } = getState();
  console.log(riderSignUpField);
  const { data } = await client.mutate({
    mutation: signUpRider,
    variables: { ...riderSignUpField },
    fetchPolicy: 'no-cache',
  });
};

export const requestDriverSignUp = (client: any) => async (dispatch: any, getState : any) => {
  const { driverSignUpField } = getState();
  const { data } = await client.mutate({
    mutation: signUpDriver,
    variables: { ...driverSignUpField },
    fetchPolicy: 'no-cache',
  });
};

export const {
  setLoginEmail,
  setLoginPassword,
  setRiderSignUpEmail,
  setRiderSignUpName,
  setRiderSignUpPassword,
  setRiderSignUpRePassword,
  setRiderSignUpPhoneNumber,
  setDriverSignUpName,
  setDriverSignUpPhoneNumber,
  setDriverSignUpEmail,
  setDriverSignUpPassword,
  setDriverSignUpRePassword,
  setDriverSignUpPlateNumber,
  setDriverSignUpCarType,
} = actions;

export default reducer;
