import { createSlice } from '@reduxjs/toolkit';

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

export const getHello = (client: any) => async (dispatch: any) => {
  const { data } = await client.query({
    query: helloQuery,
    fetchPolicy: 'cache-first',
  });

  dispatch(setHelloString(data));
};

export const { setLoginIdInput, setLoginPasswordInput, setHelloString } = actions;

export default reducer;
