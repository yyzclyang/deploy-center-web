import { FC, useContext, useState } from 'react';
import { Button, Table } from 'antd';
import useRequest from '@/utils/request/useRequest';
import { GetRepositories } from '@/utils/request/apiConfigCenter';
import Error, { ErrorType } from '@/components/error';
import Loading from '@/components/loading';
import RepositoryForm from './components/repositoryForm';
import styles from './repository.module.scss';
import { GlobalContext } from '@/store';

export interface RepositoryData {
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
  repositories: Array<RepositoryData>;
}

const Repository: FC = () => {
  const { data, error } = useRequest<RepositoryResponse>([GetRepositories]);
  const [editType, setEditType] = useState<null | 'edit' | 'add'>(null);
  const [
    repositoryFormData,
    setRepositoryFormData
  ] = useState<null | RepositoryData>(null);
  const { dispatch } = useContext(GlobalContext);

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
      render: (repository: RepositoryData) => {
        return repository.creator.nickname;
      }
    },
    {
      title: 'updater',
      key: 'updater',
      width: 60,
      render: (repository: RepositoryData) => {
        return repository.updater.nickname;
      }
    },
    {
      title: 'createAt',
      key: 'createAt',
      width: 120,
      render: (repository: RepositoryData) => {
        return new Date(repository.createAt).toLocaleString();
      }
    },
    {
      title: 'updateAt',
      key: 'updateAt',
      width: 120,
      render: (repository: RepositoryData) => {
        return new Date(repository.createAt).toLocaleString();
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 50,
      render: (repository: RepositoryData) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setRepositoryFormData(repository);
              setEditType('edit');
            }}
          >
            edit
          </Button>
        );
      }
    }
  ];

  console.log('Boolean(editType)', Boolean(editType), editType);
  return (
    <div className={styles['main-content']}>
      <div className={styles['operate-wrapper']}>
        <Button
          type="primary"
          onClick={() => {
            dispatch({ type: 'CHANGE_LOADING_COUNT', payload: 1 });
            // setEditType('add');
          }}
        >
          add repository
        </Button>
      </div>
      <div className={styles['table-wrapper']}>
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

      <RepositoryForm
        title={`${editType} repository`}
        visible={Boolean(editType)}
        repository={repositoryFormData}
        onClose={() => {
          setEditType(null);
          setRepositoryFormData(null);
        }}
      />
    </div>
  );
};

export default Repository;
