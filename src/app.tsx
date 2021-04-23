import { FC, Suspense, lazy, useReducer } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './utils/history';
import { Context, initialState, reducer } from './store';
import Loading from './components/loading';
import 'normalize.css';
import styles from './app.module.scss';

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router history={history}>
        <Suspense fallback={<Loading className={styles.loading} />}>
          <Switch>
            <Route
              path="/login"
              component={lazy(() => import('./pages/login'))}
            />
            <Route path="/" component={lazy(() => import('./pages/home'))} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </Context.Provider>
  );
};

export default App;
