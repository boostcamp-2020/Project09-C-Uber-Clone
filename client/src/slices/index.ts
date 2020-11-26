import { combineReducers } from 'redux';

import loginReducer from './loginSlice';
import signUpReducer from './signUpSlice';

const reducer = combineReducers({
  loginReducer,
  signUpReducer,
});

export default reducer;
