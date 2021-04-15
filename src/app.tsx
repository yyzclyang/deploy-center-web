import { FC } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './utils/history';
import Login from './pages/login';
import Home from './pages/home';
import './app.module.scss';

const App: FC = () => (
  <Router history={history}>
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect to="/home" />
    </Switch>
  </Router>
);

export default App;
