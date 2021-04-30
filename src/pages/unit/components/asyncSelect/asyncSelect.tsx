import { FC, useState } from 'react';
import { Select } from 'antd';
import styles from './asyncSelect.module.scss';

const { Option } = Select;

interface OptionItem {
  value: string;
  label: string;
}

interface AsyncBranchSelectProps {
  value?: string;
  placeholder?: string;
  onFetchListData: () => Promise<Array<OptionItem>>;
  onChange?: (value: string) => void;
}

const AsyncSelect: FC<AsyncBranchSelectProps> = props => {
  const { value, placeholder, onFetchListData, onChange } = props;

  const [itemList, setItemList] = useState<Array<OptionItem>>([]);

  const onDropdownVisibleChange = (open: boolean) => {
    if (open) {
      if (itemList.length) {
        return;
      }
      onFetchListData().then(list => {
        setItemList(list);
      });
    }
  };

  return (
    <Select
      className={styles.select}
      placeholder={placeholder}
      value={value}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onChange={onChange}
    >
      {itemList.map(item => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default AsyncSelect;
