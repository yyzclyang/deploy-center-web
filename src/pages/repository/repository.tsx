import { FC, useState } from 'react';
import { Button, message, Table } from 'antd';
import useRequest, { mutateDate } from '@/utils/request/useRequest';
import {
  CreateRepository,
  GetRepositories,
  UpdateRepository
} from '@/utils/request/apiConfigCenter';
import Error, { ErrorType } from '@/components/error';
import Loading from '@/components/loading';
import fetchData from '@/utils/request/fetchData';
import RepositoryForm from './components/repositoryForm';
import styles from './repository.module.scss';

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

  const onRepositoryFormClose = () => {
    setEditType(null);
    setRepositoryFormData(null);
  };

  const onRepositoryFormSubmit = (values: Partial<RepositoryData>) => {
    return (() => {
      if (repositoryFormData) {
        return fetchData(
          [UpdateRepository, { id: repositoryFormData.id }],
          values,
          {
            method: 'PATCH'
          }
        );
      }
      return fetchData([CreateRepository], values);
    })()
      .then(
        () => {
          message.success(
            `${repositoryFormData ? 'update' : 'create'} repository success`
          );
          mutateDate([GetRepositories]);
        },
        () => {
          message.error(
            `${repositoryFormData ? 'update' : 'create'} repository fail`
          );
        }
      )
      .finally(() => {
        onRepositoryFormClose();
      });
  };

  return (
    <div className={styles['main-content']}>
      <div className={styles['operate-wrapper']}>
        <Button
          type="primary"
          onClick={() => {
            setRepositoryFormData(null);
            setEditType('add');
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

      {Boolean(editType) && (
        <RepositoryForm
          title={`${editType} repository`}
          visible={Boolean(editType)}
          repository={repositoryFormData}
          onSubmit={onRepositoryFormSubmit}
          onClose={onRepositoryFormClose}
        />
      )}
    </div>
  );
};

export default Repository;
