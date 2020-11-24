import 'antd-mobile/dist/antd-mobile.css';

import React from 'react';

import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignUpSelectPage from './pages/SignUpSelectPage';
import RiderSignUpPage from './pages/RiderSignUpPage';

export default function App() {
  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup/select' component={SignUpSelectPage} />
        <Route path='/signup/rider' component={RiderSignUpPage} />
      </Switch>
    </>
  );
}
