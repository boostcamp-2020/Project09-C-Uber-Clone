import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'map',
  initialState: {
    originPosition: {
      lat: 0,
      lng: 0,
    },
    destPosition: {
      lat: 0,
      lng: 0,
    },
    originPlace: '',
    destPlace: '',
    originMarker: '',
    destMarker: '',
  },
  reducers: {
    setOriginPosition(state, { payload }) {
      return { ...state, originPosition: { ...state.originPosition, ...payload } };
    },
    setDestPosition(state, { payload }) {
      return { ...state, destPosition: { ...state.destPosition, ...payload } };
    },
    setOriginPlace(state, { payload }) {
      return { ...state, originPlace: payload };
    },
    setDestPlace(state, { payload }) {
      return { ...state, destPlace: payload };
    },
    setOriginMarker(state, { payload }) {
      return { ...state, originMarker: payload };
    },
    setDestMarker(state, { payload }) {
      return { ...state, destMarker: payload };
    },
  },
});

export const selectMapReducer = (state: any): {lat:number, lng:number} => {
  return state.mapReducer;
};

export const {
  setOriginPosition,
  setDestPosition,
  setOriginPlace,
  setDestPlace,
  setOriginMarker,
  setDestMarker,
} = actions;

export default reducer;
