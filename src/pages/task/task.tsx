import { FC } from 'react';
import { Table, Tag } from 'antd';
import useRequest from '@/utils/request/useRequest';
import { GetTasks } from '@/utils/request/apiConfigCenter';
import Error, { ErrorType } from '@/components/error';
import Loading from '@/components/loading';
import { TaskStatus } from '@/utils/varible';
import { TaskData, TasksRepository } from './types';
import styles from './task.module.scss';

const Task: FC = () => {
  const { data, error } = useRequest<TasksRepository>([GetTasks]);

  const TableConfig = [
    {
      title: 'index',
      dataIndex: 'index',
      key: 'index',
      width: 30,
      fixed: 'left'
    },
    {
      title: 'repository',
      key: 'repository',
      width: 40,
      render: ({ repository }: TaskData) => {
        return repository.repositoryName;
      }
    },
    {
      title: 'unit',
      key: 'unit',
      width: 40,
      render: ({ unit }: TaskData) => {
        return unit.unitName;
      }
    },
    {
      title: 'commit',
      key: 'commit',
      width: 40,
      render: ({ commit }: TaskData) => {
        return (
          <Tag color="blue" className={styles.wrap}>
            {commit.substr(0, 8)}
          </Tag>
        );
      }
    },
    {
      title: 'taskStatus',
      key: 'taskStatus',
      width: 50,
      render: ({ taskStatus }: TaskData) => {
        switch (taskStatus) {
          case TaskStatus.WAITING: {
            return (
              <Tag color="#2db7f5" className={styles.wrap}>
                {taskStatus}
              </Tag>
            );
          }
          case TaskStatus.PROCESSING: {
            return (
              <Tag color="#108ee9" className={styles.wrap}>
                {taskStatus}
              </Tag>
            );
          }
          case TaskStatus.SUCCESS: {
            return (
              <Tag color="#87d068" className={styles.wrap}>
                {taskStatus}
              </Tag>
            );
          }
          case TaskStatus.FAIL: {
            return (
              <Tag color="#f50f50" className={styles.wrap}>
                {taskStatus}
              </Tag>
            );
          }
          default: {
            return '--';
          }
        }
      }
    },
    {
      title: 'resourceZipUrl',
      key: 'resourceZipUrl',
      width: 60,
      render: ({ resourceZipUrl }: TaskData) => {
        return resourceZipUrl ?? '--';
      }
    },
    {
      title: 'taskStartAt',
      key: 'taskStartAt',
      width: 50,
      render: ({ taskStartAt }: TaskData) => {
        return taskStartAt ? new Date(taskStartAt).toLocaleString() : '';
      }
    },
    {
      title: 'taskFinishAt',
      key: 'taskFinishAt',
      width: 50,
      render: ({ taskFinishAt }: TaskData) => {
        return taskFinishAt ? new Date(taskFinishAt).toLocaleString() : '--';
      }
    },
    {
      title: 'taskTimeSpent',
      key: 'taskTimeSpent',
      width: 60,
      render: ({ taskTimeSpent }: TaskData) => {
        return taskTimeSpent ? Math.ceil(taskTimeSpent / 1000) : '--';
      }
    },
    {
      title: 'fetchCodeStartAt',
      key: 'fetchCodeStartAt',
      width: 70,
      render: ({ fetchCodeStartAt }: TaskData) => {
        return fetchCodeStartAt
          ? new Date(fetchCodeStartAt).toLocaleString()
          : '';
      }
    },
    {
      title: 'fetchCodeFinishAt',
      key: 'fetchCodeFinishAt',
      width: 70,
      render: ({ fetchCodeFinishAt }: TaskData) => {
        return fetchCodeFinishAt
          ? new Date(fetchCodeFinishAt).toLocaleString()
          : '--';
      }
    },
    {
      title: 'fetchCodeTimeSpent',
      key: 'fetchCodeTimeSpent',
      width: 80,
      render: ({ fetchCodeTimeSpent }: TaskData) => {
        return fetchCodeTimeSpent ? Math.ceil(fetchCodeTimeSpent / 1000) : '--';
      }
    },
    {
      title: 'buildStartAt',
      key: 'buildStartAt',
      width: 50,
      render: ({ buildStartAt }: TaskData) => {
        return buildStartAt ? new Date(buildStartAt).toLocaleString() : '';
      }
    },
    {
      title: 'buildFinishAt',
      key: 'buildFinishAt',
      width: 50,
      render: ({ buildFinishAt }: TaskData) => {
        return buildFinishAt ? new Date(buildFinishAt).toLocaleString() : '--';
      }
    },
    {
      title: 'buildTimeSpent',
      key: 'buildTimeSpent',
      width: 60,
      render: ({ buildTimeSpent }: TaskData) => {
        return buildTimeSpent ? Math.ceil(buildTimeSpent / 1000) : '--';
      }
    },
    {
      title: 'uploadStartAt',
      key: 'uploadStartAt',
      width: 50,
      render: ({ uploadStartAt }: TaskData) => {
        return uploadStartAt ? new Date(uploadStartAt).toLocaleString() : '';
      }
    },
    {
      title: 'uploadFinishAt',
      key: 'uploadFinishAt',
      width: 55,
      render: ({ uploadFinishAt }: TaskData) => {
        return uploadFinishAt
          ? new Date(uploadFinishAt).toLocaleString()
          : '--';
      }
    },
    {
      title: 'uploadTimeSpent',
      key: 'uploadTimeSpent',
      width: 60,
      render: ({ uploadTimeSpent }: TaskData) => {
        return uploadTimeSpent ? Math.ceil(uploadTimeSpent / 1000) : '--';
      }
    },
    {
      title: 'uploadFileCounts',
      key: 'uploadFileCounts',
      width: 60,
      render: ({ uploadFileCounts }: TaskData) => {
        return uploadFileCounts ?? '--';
      }
    },
    {
      title: 'creator',
      key: 'creator',
      width: 35,
      render: (task: TaskData) => {
        return task.creator.nickname;
      }
    },
    {
      title: 'createAt',
      key: 'createAt',
      width: 50,
      render: (task: TaskData) => {
        return new Date(task.createAt).toLocaleString();
      }
    },
    {
      title: 'updateAt',
      key: 'updateAt',
      width: 50,
      render: ({ updateAt }: TaskData) => {
        return updateAt ? new Date(updateAt).toLocaleString() : '--';
      }
    }
  ];

  return (
    <div className={styles['main-content']}>
      <div className={styles['table-wrapper']}>
        {data ? (
          <Table
            // @ts-ignore
            columns={TableConfig}
            dataSource={data.tasks.map(task => {
              return {
                ...task,
                key: task.id
              };
            })}
            scroll={{ x: 3000 }}
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

export default Task;
