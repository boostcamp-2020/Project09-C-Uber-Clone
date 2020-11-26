import { combineReducers } from 'redux';

import loginReducer from './loginSlice';
import signUpReducer from './signUpSlice';
import mapReducer from './mapSlice';

const reducer = combineReducers({
  loginReducer,
  signUpReducer,
  mapReducer,
});

export default reducer;
