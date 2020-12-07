import { combineReducers } from 'redux';

import mapReducer from './mapSlice';
import loginReducer from './loginSlice';
import tripReducer from './tripSlice';

const reducer = combineReducers({
  mapReducer,
  loginReducer,
  tripReducer,
});

export default reducer;
