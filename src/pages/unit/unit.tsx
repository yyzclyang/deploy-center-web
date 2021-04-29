import { FC, useState } from 'react';
import { Button, Switch, Table, Tag } from 'antd';
import useRequest from '@/utils/request/useRequest';
import { GetUnits, UpdateUnits } from '@/utils/request/apiConfigCenter';
import Error, { ErrorType } from '@/components/error';
import Loading from '@/components/loading';
import styles from './unit.module.scss';
import AsyncBranchSelect from '@/pages/unit/components/asyncBranchSelect';
import fetchData from '@/utils/request/fetchData';

export enum UnitStatus {
  NORMAL = 'normal',
  LOCKED = 'locked'
}
export enum UnitType {
  TEST = 'test',
  PRODUCTION = 'production'
}

export interface UnitData {
  id: string;
  index: number;
  unitName: string;
  unitStatus: UnitStatus;
  unitType: UnitType;
  repository: RepositoryInfo;
  branch: string;
  repositoryFolder: string;
  buildFolder: string;
  buildScripts: string[];
  resourceZipFolder: string;
  uploadTargetFolder: string;
  creator: UserInfo;
  updater: UserInfo;
  createAt: Date;
  updateAt: Date;
}

interface UnitResponse {
  units: Array<UnitData>;
}

const Unit: FC = () => {
  const { data, error } = useRequest<UnitResponse>([GetUnits]);
  const [editType, setEditType] = useState<null | 'edit' | 'add'>(null);
  const [unitFormData, setUnitFormData] = useState<null | UnitData>(null);

  const TableConfig = [
    {
      title: 'unitName',
      width: 35,
      dataIndex: 'unitName',
      key: 'unitName',
      fixed: 'left'
    },
    {
      title: 'index',
      dataIndex: 'index',
      key: 'index',
      width: 25,
      fixed: 'left'
    },
    {
      title: 'unitType',
      key: 'unitType',
      width: 35,
      render: ({ unitType }: UnitData) => {
        return (
          <Tag color={unitType === UnitType.TEST ? '#87d068' : '#f50'}>
            {unitType}
          </Tag>
        );
      }
    },
    {
      title: 'repository',
      key: 'repository',
      width: 50,
      render: (unit: UnitData) => {
        return unit.repository.repositoryName;
      }
    },
    {
      title: 'branch',
      key: 'branch',
      width: 45,
      render: ({ branch, id, repository: { id: repositoryId } }: UnitData) => {
        return (
          <AsyncBranchSelect
            defaultValue={branch}
            unitId={id}
            repositoryId={repositoryId}
          />
        );
      }
    },
    {
      title: 'repositoryFolder',
      key: 'repositoryFolder',
      width: 50,
      render: ({ repositoryFolder }: UnitData) => {
        return (
          <Tag color="geekblue" className={styles.wrap}>
            {repositoryFolder}
          </Tag>
        );
      }
    },
    {
      title: 'buildFolder',
      dataIndex: 'buildFolder',
      key: 'buildFolder',
      width: 35
    },
    {
      title: 'buildScripts',
      key: 'buildScripts',
      width: 45,
      render: ({ buildScripts }: UnitData) => {
        return (
          <>
            {buildScripts.map(buildScript => (
              <Tag
                color="blue"
                key={buildScript}
                className={styles['script-tag']}
              >
                {buildScript}
              </Tag>
            ))}
          </>
        );
      }
    },
    {
      title: 'resourceZipFolder',
      key: 'resourceZipFolder',
      width: 50,
      render: ({ resourceZipFolder }: UnitData) => {
        return (
          <Tag color="volcano" className={styles.wrap}>
            {resourceZipFolder}
          </Tag>
        );
      }
    },
    {
      title: 'uploadTargetFolder',
      key: 'uploadTargetFolder',
      width: 55,
      render: ({ uploadTargetFolder }: UnitData) => {
        return (
          <Tag color="magenta" className={styles.wrap}>
            {uploadTargetFolder}
          </Tag>
        );
      }
    },
    {
      title: 'creator',
      key: 'creator',
      width: 30,
      render: (repository: UnitData) => {
        return repository.creator.nickname;
      }
    },
    {
      title: 'updater',
      key: 'updater',
      width: 30,
      render: (repository: UnitData) => {
        return repository.updater.nickname;
      }
    },
    {
      title: 'createAt',
      key: 'createAt',
      width: 50,
      render: (repository: UnitData) => {
        return new Date(repository.createAt).toLocaleString();
      }
    },
    {
      title: 'updateAt',
      key: 'updateAt',
      width: 50,
      render: (repository: UnitData) => {
        return new Date(repository.createAt).toLocaleString();
      }
    },
    {
      title: 'locked',
      key: 'unitStatus',
      fixed: 'right',
      width: 35,
      render: ({ unitStatus }: UnitData) => {
        return (
          <Switch
            checked={unitStatus === UnitStatus.LOCKED}
            onChange={() => {
              console.log('change unit status');
            }}
          />
        );
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 30,
      render: (unit: UnitData) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setUnitFormData(unit);
              setEditType('edit');
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
      <div className={styles['operate-wrapper']}>
        <Button
          type="primary"
          onClick={() => {
            setUnitFormData(null);
            setEditType('add');
          }}
        >
          add unit
        </Button>
      </div>
      <div className={styles['table-wrapper']}>
        {data ? (
          <Table
            // @ts-ignore
            columns={TableConfig}
            dataSource={data.units.map(unit => {
              return {
                ...unit,
                key: unit.id
              };
            })}
            scroll={{ x: 2000 }}
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

export default Unit;
