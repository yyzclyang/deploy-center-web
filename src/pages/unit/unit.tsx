import { FC, useState } from 'react';
import { Button, message, Modal, Switch, Table, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useRequest, { mutateDate } from '@/utils/request/useRequest';
import {
  CreateTask,
  CreateUnit,
  DeleteUnits,
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
import AsyncSelect from '../../components/asyncSelect';
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

  const createUnit = (createData: Partial<UnitFormValues>) => {
    return fetchData([CreateUnit], createData)
      .then(
        () => {
          message.success('create unit success');
        },
        reason => {
          message.error('create unit fail');
          throw reason;
        }
      )
      .finally(() => {
        return mutateDate([GetUnits]);
      });
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
    })
      .then(
        () => {
          message.success('update unit success');
        },
        reason => {
          message.error('update unit fail');
          throw reason;
        }
      )
      .finally(() => {
        return mutateDate([GetUnits]);
      });
  };

  const onUnitFormSubmit = (values: Partial<UnitFormValues>) => {
    const submitAction = unitFormData
      ? updateUnit(unitFormData.id, values)
      : createUnit(values);
    return submitAction.then(() => {
      onUnitFormClose();
    });
  };

  const createTask = (unit: UnitData) => {
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

  const deleteUnit = (unitId: string) => {
    return fetchData([DeleteUnits, { id: unitId }], undefined, {
      method: 'DELETE'
    }).then(
      () => {
        message.success('delete unit success');
        mutateDate([GetUnits]);
      },
      reason => {
        message.error('delete unit fail');
        throw reason;
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
      render: ({ repository }: UnitData) => {
        return repository?.repositoryName ?? '--';
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
            disabled={unitStatus === UnitStatus.LOCKED || !repositoryId}
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
        return new Date(repository.updateAt).toLocaleString();
      }
    },
    {
      title: 'locked',
      key: 'unitStatus',
      fixed: 'right',
      width: 35,
      render: ({ id, unitStatus, repository }: UnitData) => {
        return (
          <Switch
            disabled={!repository.id}
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
      width: 100,
      render: (unit: UnitData) => {
        const { unitStatus, repository } = unit;

        return (
          <>
            <Button
              type="primary"
              className={styles['action-button']}
              disabled={unitStatus === UnitStatus.LOCKED || !repository.id}
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
              disabled={unitStatus === UnitStatus.LOCKED || !repository.id}
              onClick={() => {
                return createTask(unit);
              }}
            >
              deploy
            </Button>
            <Button
              type="primary"
              className={styles['action-button']}
              disabled={
                unitStatus === UnitStatus.LOCKED && Boolean(repository.id)
              }
              onClick={() => {
                Modal.confirm({
                  icon: <ExclamationCircleOutlined />,
                  content: `Are you sure to delete ${unit.unitName}?`,
                  onOk() {
                    return deleteUnit(unit.id);
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
            scroll={{ x: 2100 }}
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
