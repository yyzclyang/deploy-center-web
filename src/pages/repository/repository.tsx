import { FC } from 'react';
import { Button, Table } from 'antd';
import useRequest from '@/utils/request/useRequest';
import { GetRepositories } from '@/utils/request/apiConfigCenter';
import Error, { ErrorType } from '@/components/error';
import Loading from '@/components/loading';
import styles from './repository.module.scss';

interface RepositoryType {
  id: string;
  index: number;
  repositoryName: string;
  repositoryType: RepositoryType;
  repositoryUrl: string;
  creator: UserInfo;
  updater: UserInfo;
  createAt: Date;
  updateAt: Date;
}

interface RepositoryResponse {
  repositories: Array<RepositoryType>;
}

const Repository: FC = () => {
  const { data, error } = useRequest<RepositoryResponse>([GetRepositories]);

  const TableConfig = [
    {
      title: 'repositoryName',
      width: 75,
      dataIndex: 'repositoryName',
      key: 'repositoryName',
      fixed: 'left'
    },
    {
      title: 'index',
      dataIndex: 'index',
      key: 'index',
      width: 35,
      fixed: 'left'
    },
    {
      title: 'repositoryUrl',
      dataIndex: 'repositoryUrl',
      key: 'repositoryUrl',
      width: 180
    },
    {
      title: 'creator',
      key: 'creator',
      width: 60,
      render: (repository: RepositoryType) => {
        return repository.creator.nickname;
      }
    },
    {
      title: 'updater',
      key: 'updater',
      width: 60,
      render: (repository: RepositoryType) => {
        return repository.updater.nickname;
      }
    },
    {
      title: 'createAt',
      key: 'createAt',
      width: 120,
      render: (repository: RepositoryType) => {
        return new Date(repository.createAt).toLocaleString();
      }
    },
    {
      title: 'updateAt',
      key: 'updateAt',
      width: 120,
      render: (repository: RepositoryType) => {
        return new Date(repository.createAt).toLocaleString();
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 50,
      render: (repository: RepositoryType) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              console.log(repository);
            }}
          >
            edit
          </Button>
        );
      }
    }
  ];

  return (
    <div className={styles['main-content']}>
      <div className={styles.table}>
        {data ? (
          <Table
            // @ts-ignore
            columns={TableConfig}
            dataSource={data.repositories.map(repository => {
              return {
                ...repository,
                key: repository.id
              };
            })}
            scroll={{ x: 1500 }}
            sticky
          />
        ) : error ? (
          <Error type={ErrorType.FETCH_ERROR} />
        ) : (
          <Loading className={styles.loading} />
        )}
      </div>
    </div>
  );
};

export default Repository;
