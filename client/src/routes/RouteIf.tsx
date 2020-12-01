import React, { FunctionComponent } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import SetCoursePage from '../pages/SetCoursePage';
import DriverMainPage from '../pages/DriverMainPage';
interface Paths {
  path: string;
}

const RouteIf: FunctionComponent<Paths> = ({ path }) => {
  return (
    <Route
      path={path}
      render={() => {
        if (localStorage.getItem('token')) {
          return (
            <Switch>
              <Route path='/setcourse' component={SetCoursePage} />
              <Route path='/driverMain' component={DriverMainPage} />
              <Redirect path="*" to="/login" />
            </Switch>
          );
        }
        return <Redirect to="/login"/>;
      }}
    />
  );
};

export default RouteIf;
