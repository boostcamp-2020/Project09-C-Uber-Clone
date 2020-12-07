import 'antd-mobile/dist/antd-mobile.css';

import React from 'react';

import { Route, Switch } from 'react-router-dom';

import SignUpSelectPage from './pages/SignUpSelectPage';
import RiderSignUpPage from './pages/RiderSignUpPage';
import DriverSignUpPage from './pages/DriverSignUpPage';
import LoginPage from './pages/LoginPage';

import RouteIf from './routes/RouteIf';

export default function App() {
  return (
    <>
      <Switch>
        <Route path='/signup/select' component={SignUpSelectPage} />
        <Route path='/signup/rider' component={RiderSignUpPage} />
        <Route path='/signup/driver' component={DriverSignUpPage} />
        <Route path='/login' component={LoginPage} />
        <RouteIf path='*' />
      </Switch>
    </>
  );
}
