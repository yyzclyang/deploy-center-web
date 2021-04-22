import { FC, Suspense, lazy, useReducer } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './utils/history';
import { Context, initialState, reducer } from './store';
import Loading from './components/loading';
import 'normalize.css';
import './app.module.scss';

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router history={history}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </Context.Provider>
  );
};

export default App;
