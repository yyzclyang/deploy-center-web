import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import Repository from '@/pages/repository';
import Unit from '@/pages/unit';
import Task from '@/pages/task';
import Introduction from '@/pages/introduction';
import Header from './components/header';
import style from './home.module.scss';

const Home: FC = () => {
  return (
    <div className={style.page}>
      <Header className={style.header} />
      <div className={style.main}>
        <aside className={style.aside}>
          <NavLink to="/repositories">repositories</NavLink>
          <NavLink to="/units">units</NavLink>
          <NavLink to="/tasks">tasks</NavLink>
        </aside>
        <main className="content">
          <Switch>
            <Route exact path="/">
              <Introduction />
            </Route>
            <Route path="/repositories">
              <Repository />
            </Route>
            <Route path="/units">
              <Unit />
            </Route>
            <Route path="/tasks">
              <Task />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Home;
