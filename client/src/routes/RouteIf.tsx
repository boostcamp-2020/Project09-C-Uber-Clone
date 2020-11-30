import React, { FunctionComponent } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import { useApolloClient } from '@apollo/client';

import { useSelector, useDispatch } from 'react-redux';

import { verifyUser } from '../apis/verifyUserAPI';

import SetCoursePage from '../pages/SetCoursePage';
import DriverWaitingPage from '../pages/DriverWaitingPage';
import LoginPage from '../pages/LoginPage';

interface Paths {
  path: string;
}

const RouteIf: FunctionComponent<Paths> = ({ path }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const { loginReducer }: any = useSelector((state: any) => state);

  return (
    <Route
      path={path}
      render={() => {
        if (loginReducer.loginRole === '') {
          verifyUser(client, dispatch);
          return;
        }
        if (loginReducer.loginRole === 'driver') {
          return (
            <Switch>
              <Route path='/driver/main' component={DriverWaitingPage} />
              <Redirect path="*" to="/driver/main" />
            </Switch>
          );
        }
        if (loginReducer.loginRole === 'rider') {
          return (
            <Switch>
              <Route path='/setcourse' component={SetCoursePage} />
              <Redirect path="*" to="/setcourse" />
            </Switch>
          );
        }
        if (loginReducer.loginRole === 'null') {
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
