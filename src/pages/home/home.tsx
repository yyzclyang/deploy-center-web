import { FC, Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import Header from './components/header';
import styles from './home.module.scss';

const Home: FC = () => {
  return (
    <div className={styles.page}>
      <Header className={styles.header} />
      <div className={styles['main-region']}>
        <aside className={styles.aside}>
          <ul className={styles['route-ul']}>
            {['repositories', 'units', 'tasks'].map(route => (
              <li className={styles['route-li']} key={route}>
                <NavLink className={styles['route-link']} to={`/${route}`}>
                  {route}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles['main-content']}>
          <Suspense fallback={null}>
            <Switch>
              <Route
                exact
                path="/"
                component={lazy(() => import('../introduction'))}
              />
              <Route
                path="/repositories"
                component={lazy(() => import('../repository'))}
              />
              <Route path="/units" component={lazy(() => import('../unit'))} />
              <Route path="/tasks" component={lazy(() => import('../task'))} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Home;
