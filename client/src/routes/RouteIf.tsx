import React, { FunctionComponent } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { VERIFY_USER_ROLE } from '../queries/verify';
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
  const { loginReducer }: any = useSelector((state: any) => state);

  useQuery(VERIFY_USER_ROLE, { onCompleted: (userData) => {
    if (loginReducer.loginRole === '') {
      !!userData ? dispatch(setLoginRole(userData.verifyUser.role)) : dispatch(setLoginRole('unknown'));
    }
  } });

  return (
    <Route
      path={path}
      render={() => {
        if (loginReducer.loginRole === 'driver') {
          return (
            <Switch>
              <Route path='/driver/main' component={DriverWaitingPage} />
              <Route path='/driver/pickup' component={DriverPickUpPage} />
              <Redirect path="*" to="/driver/main" />
            </Switch>
          );
        }
        if (loginReducer.loginRole === 'rider') {
          return (
            <Switch>
              <Route path='/rider/setcourse' component={SetCoursePage} />
              <Route path='/rider/pickup' component={RiderPickUpPage} />
              <Route path='/rider/waiting' component={RiderWaitingPage}/>
              <Redirect path="*" to="/rider/setcourse" />
            </Switch>
          );
        }
        if (loginReducer.loginRole === 'unknown') {
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
