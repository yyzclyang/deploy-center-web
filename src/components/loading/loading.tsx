import { CSSProperties, FC } from 'react';
import { CloudDownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './loading.module.scss';

export enum LoadingType {
  NORMAL = 'normal',
  DOWNLOAD = 'download'
}

interface LoadingProps {
  className?: string;
  style?: CSSProperties;
  type?: LoadingType;
}

const Loading: FC<LoadingProps> = props => {
  const { className, style, type } = props;

  return (
    <div
      style={style}
      className={[styles.wrapper, className].filter(v => v).join(' ')}
    >
      {(() => {
        switch (type) {
          case LoadingType.NORMAL:
            return <LoadingOutlined className={styles.loading} />;
          case LoadingType.DOWNLOAD:
            return <CloudDownloadOutlined className={styles.loading} />;
          default:
            return <LoadingOutlined className={styles.loading} />;
        }
      })()}
    </div>
  );
};

export default Loading;
