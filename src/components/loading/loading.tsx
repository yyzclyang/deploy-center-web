import { LoadingOutlined } from '@ant-design/icons';
import style from './loading.module.scss';

const Loading = () => {
  return (
    <div className={style.wrapper}>
      <LoadingOutlined style={{ fontSize: '40px', color: '#666' }} />
    </div>
  );
};

export default Loading;
