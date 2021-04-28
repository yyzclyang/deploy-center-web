import { CSSProperties, FC } from 'react';
import { FileUnknownOutlined } from '@ant-design/icons';
import styles from './error.module.scss';

export enum ErrorType {
  FETCH_ERROR = 'fetch-error',
  NET_ERROR = 'net-error'
}

interface ErrorProps {
  className?: string;
  style?: CSSProperties;
  type?: ErrorType;
}

const Error: FC<ErrorProps> = props => {
  const { className, style, type } = props;

  return (
    <div
      style={style}
      className={[styles.wrapper, className].filter(v => v).join(' ')}
    >
      {(() => {
        switch (type) {
          case ErrorType.FETCH_ERROR:
            return <FileUnknownOutlined className={styles.icon} />;
          default:
            return '';
        }
      })()}
    </div>
  );
};

export default Error;
