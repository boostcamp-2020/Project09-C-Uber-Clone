import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'trip',
  initialState: {
    trip: { id: undefined },
    rider: { id: '', name: '', email: '' },
    driver: { id: '', name: '', carType: '', plateNumber: '', description: '', profileImage: '' },
  },
  reducers: {
    setTrip(state, { payload }) {
      return { ...state, trip: { ...state.trip, ...payload } };
    },
    setRider(state, { payload }) {
      return { ...state, rider: { ...state.rider, ...payload } };
    },
    setDriver(state, { payload }) {
      return { ...state, driver: { ...state.driver, ...payload } };
    },
  },
});

export const selectTripReducer = (state: any) => {
  return state.tripReducer;
};

export const {
  setTrip, setRider, setDriver,
} = actions;

export default reducer;
