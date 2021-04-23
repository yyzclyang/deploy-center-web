import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/images/deploy.png';
import style from './header.module.scss';

interface Props {
  className?: string;
}
const Header: FC<Props> = props => {
  const { className } = props;

  return (
    <header className={[className, style.header].filter(v => v).join(' ')}>
      <div className={style['logo-wrapper']}>
        <NavLink to="/" className={style.logo}>
          <img className={style['logo-image']} src={logo} alt="logo" />
          Deployer
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
