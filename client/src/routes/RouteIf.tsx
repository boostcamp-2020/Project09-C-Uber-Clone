import React, { FunctionComponent } from 'react';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import SetCoursePage from '../pages/SetCoursePage';
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
            <Router>
              <Switch>
                <Route path='/setcourse' component={SetCoursePage} />
                <Redirect path="*" to="/login" />
              </Switch>
            </Router>
          );
        }
        return <Redirect to="/login"/>;
      }}
    />
  );
};

export default RouteIf;
