import { FC } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import styles from './loadingModal.module.scss';

interface LoadingModalProps {
  visible?: boolean;
  container: Element;
}

const LoadingModal: FC<LoadingModalProps> = props => {
  const { container, visible } = props;

  return ReactDOM.createPortal(
    visible ? (
      <div className={styles['loading-wrapper']}>
        <Spin size="large" className={styles.loading} />
      </div>
    ) : null,
    container
  );
};

export default LoadingModal;
