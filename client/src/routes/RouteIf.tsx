import React, { FunctionComponent } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { VERIFY_USER_ROLE } from '../queries/verify';
import { setLoginRole } from '../slices/loginSlice';
import { setTrip } from '../slices/tripSlice';
import SetCoursePage from '../pages/SetCoursePage';
import DriverWaitingPage from '../pages/DriverWaitingPage';
import DriverPickUpPage from '../pages/DriverPickUpPage';
import LoginPage from '../pages/LoginPage';
import RiderPickUpPage from '../pages/RiderPickUpPage';
import RiderWaitingPage from '../pages/RiderWaitingPage';
import DriverDrivingPage from '../pages/DriverDrivingPage';
import RiderDrivingPage from '../pages/RiderDrivingPage';


interface Paths {
  path: string;
}

const RouteIf: FunctionComponent<Paths> = ({ path }) => {
  const dispatch = useDispatch();
  const { loginReducer }: any = useSelector((state: any) => state);

  useQuery(VERIFY_USER_ROLE, { onCompleted: data => {
    dispatch(setLoginRole(data.verifyUser.role));
    dispatch(setTrip({ id: localStorage.getItem('tripId') }));
  } });

  console.log(loginReducer);
  return (
    <Route
      path={path}
      render={() => {
        if (loginReducer.loginRole === '') {
          return;
        }
        if (loginReducer.loginRole === 'driver') {
          return (
            <Switch>
              <Route path='/driver/main' component={DriverWaitingPage} />
              <Route path='/driver/pickup' component={DriverPickUpPage} />
              <Route path='/driver/driving' component={DriverDrivingPage} />
              <Redirect path="*" to="/driver/main" />
            </Switch>
          );
        }
        if (loginReducer.loginRole === 'rider') {
          return (
            <Switch>
              <Route path='/rider/setcourse' component={SetCoursePage} />
              <Route path='/rider/waiting' component={RiderWaitingPage}/>
              <Route path='/rider/pickup' component={RiderPickUpPage} />
              <Route path='/rider/driving' component={RiderDrivingPage} />
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
