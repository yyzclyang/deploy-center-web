import { FC, MouseEventHandler, useState } from 'react';
import { Select } from 'antd';
import fetchData from '@/utils/request/fetchData';
import { GetBranches } from '@/utils/request/apiConfigCenter';
import styles from './asyncBranchSelect.module.scss';

const { Option } = Select;

interface AsyncBranchSelectProps {
  value: string;
  repositoryId: string;
  onChange: (branch: string) => void;
}

interface BranchesInfo {
  branches: Array<BranchInfo>;
}

const AsyncBranchSelect: FC<AsyncBranchSelectProps> = props => {
  const { value, repositoryId, onChange } = props;
  const [branchList, setBranchList] = useState([value]);

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

  return (
    <Select
      className={styles.select}
      value={value}
      onClick={onSelectClick}
      onChange={onChange}
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
