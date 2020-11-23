import { createSlice } from '@reduxjs/toolkit';

import { gql, useQuery } from '@apollo/client';

import { helloQuery } from './queries/hello';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    loginIdInput: '',
    loginPasswordInput: '',
    helloString: '',
  },
  reducers: {
    setLoginIdInput(state, { payload }) {
      return payload;
    },
    setLoginPasswordInput(state, { payload }) {
      return payload;
    },
    setHelloString(state, { payload }) {
      return payload;
    },
  },
});

export const getHello = () => async (dispatch: any) => {
  const { loading, data, error } = useQuery(
    helloQuery,
    {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  );

  dispatch(setHelloString(data));
};

export const { setLoginIdInput, setLoginPasswordInput, setHelloString } = actions;

export default reducer;
