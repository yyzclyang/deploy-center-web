import { FC, useState } from 'react';
import { Button, message, Modal, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useRequest, { mutateDate } from '@/utils/request/useRequest';
import {
  CreateRepository,
  DeleteRepository,
  GetRepositories,
  UpdateRepository
} from '@/utils/request/apiConfigCenter';
import Error, { ErrorType } from '@/components/error';
import Loading from '@/components/loading';
import fetchData from '@/utils/request/fetchData';
import RepositoryForm from './components/repositoryForm';
import { RepositoryData, RepositoryResponse } from './types';
import styles from './repository.module.scss';

const Repository: FC = () => {
  const { data, error } = useRequest<RepositoryResponse>([GetRepositories]);
  const [editType, setEditType] = useState<null | 'edit' | 'add'>(null);
  const [
    repositoryFormData,
    setRepositoryFormData
  ] = useState<null | RepositoryData>(null);

  const onRepositoryFormClose = () => {
    setEditType(null);
    setRepositoryFormData(null);
  };

  const createRepository = (createData: Partial<RepositoryData>) => {
    return fetchData([CreateRepository], createData);
  };

  const updateRepository = (
    repositoryId: string,
    updateData: Partial<RepositoryData>
  ) => {
    return fetchData([UpdateRepository, { id: repositoryId }], updateData, {
      method: 'PATCH'
    });
  };

  const onRepositoryFormSubmit = (values: Partial<RepositoryData>) => {
    const submitAction = repositoryFormData
      ? updateRepository(repositoryFormData.id, values)
      : createRepository(values);
    return submitAction.then(
      () => {
        message.success(
          `${repositoryFormData ? 'update' : 'create'} repository success`
        );
        onRepositoryFormClose();
        return mutateDate([GetRepositories]);
      },
      reason => {
        message.error(
          `${repositoryFormData ? 'update' : 'create'} repository fail`
        );
        throw reason;
      }
    );
  };

  const deleteRepository = (repositoryId: string) => {
    return fetchData([DeleteRepository, { id: repositoryId }], undefined, {
      method: 'DELETE'
    }).then(
      () => {
        message.success('delete repository success');
        mutateDate([GetRepositories]);
      },
      reason => {
        message.error('delete repository fail');
        throw reason;
      }
    );
  };

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
        return new Date(repository.updateAt).toLocaleString();
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 90,
      render: (repository: RepositoryData) => {
        return (
          <>
            <Button
              type="primary"
              className={styles['action-button']}
              onClick={() => {
                setRepositoryFormData(repository);
                setEditType('edit');
              }}
            >
              edit
            </Button>
            <Button
              type="primary"
              className={styles['action-button']}
              onClick={() => {
                Modal.confirm({
                  icon: <ExclamationCircleOutlined />,
                  content: `Are you sure to delete ${repository.repositoryName}?`,
                  onOk() {
                    return deleteRepository(repository.id);
                  }
                });
              }}
            >
              delete
            </Button>
          </>
        );
      }
    }
  ];

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
