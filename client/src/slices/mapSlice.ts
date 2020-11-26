import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'map',
  initialState: {
    position: {
      lat: 0,
      lng: 0,
    },
  },
  reducers: {
    setPosition(state, { payload }) {
      console.log(payload);
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
