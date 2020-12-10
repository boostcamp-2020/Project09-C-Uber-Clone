import React, { FunctionComponent } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { VERIFY_USER_ROLE } from '../queries/verify';
import { GET_MY_TRIPS } from '../queries/trip';
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
import TripClosePage from '../pages/TripClosePage';

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

  useQuery(GET_MY_TRIPS, {
    variables: { statuses: ['open', 'matched', 'onBoard'] },
    onCompleted: (data) => {
      if (data.myTrips.length === 1) {
        dispatch(setTrip({ id: data.myTrips[0].id }));
      }
    },
  });

  return (
    <Route
      path={path}
      render={() => {
        if (loginReducer.loginRole === 'driver') {
          return (
            <Switch>
              <Route path='/driver/main' component={DriverWaitingPage} />
              <Route path='/driver/pickup' component={DriverPickUpPage} />
              <Route path='/driver/driving' component={DriverDrivingPage} />
              <Route path='/driver/tripend' component={TripClosePage} />
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
              <Route path='/rider/tripend' component={TripClosePage} />
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
