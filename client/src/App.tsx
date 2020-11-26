import 'antd-mobile/dist/antd-mobile.css';

import React from 'react';

import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignUpSelectPage from './pages/SignUpSelectPage';
import RiderSignUpPage from './pages/RiderSignUpPage';
import DriverSignUpPage from './pages/DriverSignUpPage';
import TestPage from './pages/TestPage';

export default function App() {
  return (
    <>
      <Switch>
        <Route path='/signup/select' component={SignUpSelectPage} />
        <Route path='/signup/rider' component={RiderSignUpPage} />
        <Route path='/signup/driver' component={DriverSignUpPage} />
        <Route exact path='/' component={LoginPage} />
        <Route path='/test' component={TestPage} />
      </Switch>
    </>
  );
}
