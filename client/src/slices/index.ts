import { combineReducers } from 'redux';

import signUpReducer from './signUpSlice';
import mapReducer from './mapSlice';

const reducer = combineReducers({
  signUpReducer,
  mapReducer,
});

export default reducer;
