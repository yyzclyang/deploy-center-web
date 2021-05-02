import { FC, useContext, useEffect } from 'react';
import history from '@/utils/history';
import { GlobalContext } from '@/store';
import styles from './introduction.module.scss';

const Introduction: FC = () => {
  const {
    state: { token }
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token]);

  return (
    <div className={styles['main-content']}>
      <article>
        <p className={styles.description}>
          deploy-center 是一个基于 node 开发的打包平台。
        </p>
        <p className={styles.description}>
          后端基于 koa 技术栈，前端基于 React 技术栈。
        </p>
        <p className={styles.description}>author by yyzcl</p>
      </article>
    </div>
  );
};

export default Introduction;
