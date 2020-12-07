import React, { FunctionComponent, useEffect } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';

import { USER_ROLE } from '../queries/verify';
import { setLoginRole } from '../slices/loginSlice';
import SetCoursePage from '../pages/SetCoursePage';
import DriverWaitingPage from '../pages/DriverWaitingPage';
import DriverPickUpPage from '../pages/DriverPickUpPage';
import LoginPage from '../pages/LoginPage';
import RiderPickUpPage from '../pages/RiderPickUpPage';
import RiderWaitingPage from '../pages/RiderWaitingPage';


interface Paths {
  path: string;
}

const RouteIf: FunctionComponent<Paths> = ({ path }) => {
  const dispatch = useDispatch();
  const { data } = useQuery(USER_ROLE, { onCompleted: data => dispatch(setLoginRole(data.verifyUser.role)) });

  return (
    <Route
      path={path}
      render={() => {
        if (!data) {
          return;
        }
        if (data.verifyUser.role === 'driver') {
          return (
            <Switch>
              <Route path='/driver/main' component={DriverWaitingPage} />
              <Route path='/driver/pickup' component={DriverPickUpPage} />
              <Redirect path="*" to="/driver/main" />
            </Switch>
          );
        }
        if (data.verifyUser.role === 'rider') {
          return (
            <Switch>
              <Route path='/rider/setcourse' component={SetCoursePage} />
              <Route path='/rider/pickup' component={RiderPickUpPage} />
              <Route path='/rider/waiting' component={RiderWaitingPage}/>
              <Redirect path="*" to="/rider/setcourse" />
            </Switch>
          );
        }
        if (data.verifyUser.role === 'unknown') {
          localStorage.removeItem('token');
          return (
            <Switch>
              <Route path='/login' component={LoginPage} />
              <Redirect path="*" to="/login" />
            </Switch>
          );
        }
      }}
    />
  );
};

export default RouteIf;
