import { combineReducers } from 'redux';

import mapReducer from './mapSlice';
import loginReducer from './loginSlice';

const reducer = combineReducers({
  mapReducer,
  loginReducer,
});

export default reducer;
