import { FC, useState } from 'react';
import { Button, message, Switch, Table, Tag } from 'antd';
import useRequest, { mutateDate } from '@/utils/request/useRequest';
import {
  CreateTask,
  CreateUnit,
  GetBranches,
  GetTasks,
  GetUnits,
  UpdateUnits
} from '@/utils/request/apiConfigCenter';
import Error, { ErrorType } from '@/components/error';
import Loading from '@/components/loading';
import fetchData from '@/utils/request/fetchData';
import { UnitStatus, UnitType } from '@/utils/varible';
import UnitForm from './components/unitForm';
import AsyncSelect from './components/asyncSelect';
import { BranchesInfo, UnitData, UnitFormValues } from './types';
import styles from './unit.module.scss';

interface UnitResponse {
  units: Array<UnitData>;
}

const Unit: FC = () => {
  const { data, error } = useRequest<UnitResponse>([GetUnits]);
  const [editType, setEditType] = useState<null | 'edit' | 'add'>(null);
  const [unitFormData, setUnitFormData] = useState<null | UnitData>(null);

  const onUnitFormClose = () => {
    setEditType(null);
    setUnitFormData(null);
  };

  const updateUnit = async (
    unitId: string,
    updateData: Partial<UnitFormValues>
  ) => {
    await mutateDate([GetUnits], {
      units: data.units.map(unit => {
        if (unit.id === unitId) {
          return { ...unit, ...updateData };
        }
        return unit;
      })
    });

    return fetchData([UpdateUnits, { id: unitId }], updateData, {
      method: 'PATCH'
    });
  };

  const onUnitFormSubmit = (values: Partial<UnitFormValues>) => {
    return (() => {
      if (unitFormData) {
        return updateUnit(unitFormData.id, values);
      }
      return fetchData([CreateUnit], values);
    })().then(
      () => {
        message.success(`${unitFormData ? 'update' : 'create'} unit success`);
        onUnitFormClose();
        mutateDate([GetUnits]);
      },
      () => {
        message.error(`${unitFormData ? 'update' : 'create'} unit fail`);
      }
    );
  };

  const onCreateTask = (unit: UnitData) => {
    return fetchData([CreateTask], { unitId: unit.id }).then(
      () => {
        message.success('create task success');
        mutateDate([GetTasks]);
      },
      () => {
        message.error('create task fail');
      }
    );
  };

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
      render: ({
        unitStatus,
        branch,
        id,
        repository: { id: repositoryId }
      }: UnitData) => {
        return (
          <AsyncSelect
            value={branch}
            disabled={unitStatus === UnitStatus.LOCKED}
            onFetchListData={() => {
              return fetchData<BranchesInfo>(
                [GetBranches, { id: repositoryId }],
                undefined,
                {
                  method: 'get'
                }
              ).then(({ branches }) => {
                return branches.map(branchInfo => ({
                  label: branchInfo.branch,
                  value: branchInfo.branch
                }));
              });
            }}
            onChange={value => {
              if (value === branch) {
                return;
              }
              return updateUnit(id, { branch: value });
            }}
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
      width: 40
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
      width: 55,
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
      width: 60,
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
      render: ({ id, unitStatus }: UnitData) => {
        return (
          <Switch
            checked={unitStatus === UnitStatus.LOCKED}
            onChange={value => {
              return updateUnit(id, {
                unitStatus: value ? UnitStatus.LOCKED : UnitStatus.NORMAL
              });
            }}
          />
        );
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 65,
      render: (unit: UnitData) => {
        const { unitStatus } = unit;

        return (
          <>
            <Button
              type="primary"
              className={styles['action-button']}
              disabled={unitStatus === UnitStatus.LOCKED}
              onClick={() => {
                setUnitFormData(unit);
                setEditType('edit');
              }}
            >
              edit
            </Button>
            <Button
              type="primary"
              className={styles['action-button']}
              disabled={unitStatus === UnitStatus.LOCKED}
              onClick={() => {
                return onCreateTask(unit);
              }}
            >
              deploy
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

      {Boolean(editType) && (
        <UnitForm
          title={`${editType} unit`}
          visible={Boolean(editType)}
          unit={unitFormData}
          onSubmit={onUnitFormSubmit}
          onClose={onUnitFormClose}
        />
      )}
    </div>
  );
};

export default Unit;
