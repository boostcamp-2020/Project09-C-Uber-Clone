import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'map',
  initialState: {
    position: {
      lat: 37.512359618923725,
      lng: 126.86565258928634,
    },
  },
  reducers: {
    setPosition(state, { payload }) {
      return { ...state, position: { ...state, ...payload } };
    },
  },
});

export const selectPosition = (state: any): {lat:number, lng:number} => {
  return state.mapReducer.position;
};

export const {
  setPosition,
} = actions;

export default reducer;
