import { FC, MouseEventHandler, useState } from 'react';
import { message, Select } from 'antd';
import fetchData from '@/utils/request/fetchData';
import { GetBranches, UpdateUnits } from '@/utils/request/apiConfigCenter';
import styles from './asyncBranchSelect.module.scss';

const { Option } = Select;

interface AsyncBranchSelectProps {
  defaultValue: string;
  unitId: string;
  repositoryId: string;
}

interface BranchesInfo {
  branches: Array<BranchInfo>;
}

const AsyncBranchSelect: FC<AsyncBranchSelectProps> = props => {
  const { defaultValue, repositoryId, unitId } = props;
  const [branchList, setBranchList] = useState([defaultValue]);

  const onSelectClick: MouseEventHandler<HTMLSpanElement> = event => {
    const isSelect = (event.target as HTMLSpanElement).tagName === 'SPAN';
    if (isSelect) {
      if (branchList.length > 1) {
        return;
      }
      fetchData<BranchesInfo>([GetBranches, { id: repositoryId }], undefined, {
        method: 'get'
      }).then(({ branches }) => {
        setBranchList(branches.map(branchInfo => branchInfo.branch));
      });
    }
  };

  const onBranchChange = (branch: string) => {
    fetchData(
      [UpdateUnits, { id: unitId }],
      { branch },
      { method: 'PATCH' }
    ).then(
      () => {
        message.success('update unit branch success');
      },
      () => {
        message.error('update unit branch fail');
      }
    );
  };

  return (
    <Select
      className={styles.select}
      defaultValue={defaultValue}
      onClick={onSelectClick}
      onChange={onBranchChange}
    >
      {branchList.map(branch => (
        <Option key={branch} value={branch}>
          {branch}
        </Option>
      ))}
    </Select>
  );
};

export default AsyncBranchSelect;
