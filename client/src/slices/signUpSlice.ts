import { createSlice } from '@reduxjs/toolkit';

import { signUpDriver, signUpRider } from '../queries/signup';

const { actions, reducer } = createSlice({
  name: 'signup',
  initialState: {
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

export const requestRiderSignUp = (client: any, history: any) => async (dispatch: any, getState : any) => {
  const { riderSignUpField } = getState().signUpReducer;
  const { data } = await client.mutate({
    mutation: signUpRider,
    variables: { ...riderSignUpField },
    fetchPolicy: 'no-cache',
  });
  if (data) {
    history.push('/login');
  }
  window.alert('회원가입 실패');
  history.push('/signup/rider') ;
};

export const requestDriverSignUp = (client: any, history: any) => async (dispatch: any, getState : any) => {
  const { driverSignUpField } = getState().signUpReducer;
  const { data } = await client.mutate({
    mutation: signUpDriver,
    variables: { ...driverSignUpField },
    fetchPolicy: 'no-cache',
  });
  if (data.createRider) {
    history.push('/login');
  }
  window.alert('회원가입 실패');
  history.push('/signup/driver') ;
};

export const {
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
