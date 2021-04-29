import { FC, Suspense, lazy, useReducer } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import 'normalize.css';
import history from './utils/history';
import { GlobalContext, GlobalReducer, initialState, reducer } from './store';
import Loading from './components/loading';
import styles from './app.module.scss';

const App: FC = () => {
  const [state, dispatch] = useReducer<GlobalReducer>(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
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
    </GlobalContext.Provider>
  );
};

export default App;
