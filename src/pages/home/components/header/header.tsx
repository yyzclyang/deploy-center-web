import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import logo from '@/assets/images/deploy.png';
import { GlobalContext } from '@/store';
import history from '@/utils/history';
import localStorageUtil from '@/utils/localStorageUtil';
import styles from './header.module.scss';

interface Props {
  className?: string;
}
const Header: FC<Props> = props => {
  const { className } = props;
  const { state, dispatch } = useContext(GlobalContext);

  const logout = () => {
    dispatch({ type: 'CHANGE_TOKEN', payload: '' });
    localStorageUtil.set('__LOGIN_INFO__', {
      token: '',
      userInfo: state.userInfo
    });
    history.push('/login');
  };

  return (
    <header className={[className, styles.header].filter(v => v).join(' ')}>
      <div className={styles['logo-wrapper']}>
        <NavLink to="/" className={styles.logo}>
          <img className={styles['logo-image']} src={logo} alt="logo" />
          Deployer
        </NavLink>
      </div>
      <div className={styles['header-content']}>
        <div className={styles.logout}>
          <Button type="link" onClick={logout}>
            logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
