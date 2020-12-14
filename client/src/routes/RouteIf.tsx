import React, { FunctionComponent } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { VERIFY_USER_ROLE } from '../queries/verify';
import { selectLoginReducer, setLoginRole } from '../slices/loginSlice';
import SetCoursePage from '../pages/SetCoursePage';
import DriverWaitingPage from '../pages/DriverWaitingPage';
import DriverPickUpPage from '../pages/DriverPickUpPage';
import LoginPage from '../pages/LoginPage';
import RiderPickUpPage from '../pages/RiderPickUpPage';
import RiderWaitingPage from '../pages/RiderWaitingPage';
import DriverDrivingPage from '../pages/DriverDrivingPage';
import RiderDrivingPage from '../pages/RiderDrivingPage';
import TripClosePage from '../pages/TripClosePage';
import ValidateTripStatus from './ValidateTripStatus';
import { setTrip } from '../slices/tripSlice';
interface Paths {
  path: string;
}

const RouteIf: FunctionComponent<Paths> = ({ path }) => {
  const dispatch = useDispatch();

  const { loginRole } = useSelector(selectLoginReducer);

  const { loading } = useQuery(VERIFY_USER_ROLE, { onCompleted: (data) => {
    dispatch(setLoginRole(data.verifyUser.role));
    dispatch(setTrip({ id: data.verifyUser.tripId }));
  }, skip: loginRole !== '' });

  return (
    <>{!loading &&
    <Route
      path={path}
      render={() => {
        if (loginRole === 'driver') {
          return (
            <Switch>
              <Route path='/driver/main' component={ValidateTripStatus(DriverWaitingPage, 'main')} />
              <Route path='/driver/pickup' component={ValidateTripStatus(DriverPickUpPage, 'matched')} />
              <Route path='/driver/driving' component={ValidateTripStatus(DriverDrivingPage, 'onBoard')} />
              <Route path='/driver/tripend' component={ValidateTripStatus(TripClosePage, 'close')} />
              <Redirect path="*" to="/driver/main" />
            </Switch>
          );
        }
        if (loginRole === 'rider') {
          return (
            <Switch>
              <Route path='/rider/setcourse' component={ValidateTripStatus(SetCoursePage, 'main')} />
              <Route path='/rider/waiting' component={ValidateTripStatus(RiderWaitingPage, 'open')}/>
              <Route path='/rider/pickup' component={ValidateTripStatus(RiderPickUpPage, 'matched')} />
              <Route path='/rider/driving' component={ValidateTripStatus(RiderDrivingPage, 'onBoard')} />
              <Route path='/rider/tripend' component={ValidateTripStatus(TripClosePage, 'close')} />
              <Redirect path="*" to="/rider/setcourse" />
            </Switch>
          );
        }
        if (loginRole === 'unknown') {
          localStorage.removeItem('token');
          return (
            <Switch>
              <Route path='/login' component={LoginPage} />
              <Redirect path="*" to="/login" />
            </Switch>
          );
        }
      }}
    />}</>
  );
};

export default RouteIf;
