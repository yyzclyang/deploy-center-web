import { FC } from 'react';
import { Col, Modal, Form, Input, Row, Select } from 'antd';
import AsyncSelect from '@/components/asyncSelect';
import fetchData from '@/utils/request/fetchData';
import { GetBranches, GetRepositories } from '@/utils/request/apiConfigCenter';
import { UnitStatus, UnitType } from '@/utils/varible';
import { RepositoryResponse } from '@/pages/repository/types';
import {
  BranchesInfo,
  UnitData,
  UnitFormOriginValues,
  UnitFormValues
} from '../../types';

const { Option } = Select;

function getUnitFormValues(
  values: UnitFormOriginValues,
  isEditing = false
): Partial<UnitFormValues> {
  const { unitType, repository, buildScripts, ...restFormValues } = values;
  if (isEditing) {
    return {
      ...restFormValues,
      buildScripts: buildScripts.split(';')
    };
  }
  return {
    ...restFormValues,
    unitType,
    repositoryId: repository,
    buildScripts: buildScripts.split(';')
  };
}

interface EditUnitProps {
  unit?: UnitData;
  title: string;
  visible: boolean;
  onSubmit: (values: Partial<UnitFormValues>) => void;
  onClose: () => void;
}

const UnitForm: FC<EditUnitProps> = props => {
  const { title, visible, unit } = props;
  const [form] = Form.useForm();

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    return form
      .validateFields()
      .then((values: UnitFormOriginValues) => {
        form.resetFields();
        // if (unit) {
        //   const { unitType, repository, buildScripts, ...rest } = values;
        //   return props.onSubmit({
        //     ...rest,
        //     buildScripts: buildScripts.split(';')
        //   });
        // }
        return props.onSubmit(getUnitFormValues(values, Boolean(unit)));
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={title}
      width={480}
      visible={visible}
      okText="Submit"
      cancelText="Cancel"
      onOk={onSubmit}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          unit
            ? {
                ...unit,
                repository: unit.repository.repositoryName,
                buildScripts: unit.buildScripts.join(';')
              }
            : null
        }
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="unitName"
              label="Unit Name"
              rules={[{ required: true, message: 'Please enter unit name' }]}
            >
              <Input placeholder="Please enter unit name" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="unitStatus"
              label="Unit Status"
              rules={[
                {
                  required: true,
                  message: 'Please select a unit status'
                }
              ]}
            >
              <Select placeholder="Please select a unit status">
                <Option value={UnitStatus.NORMAL}>
                  {UnitStatus.NORMAL.toUpperCase()}
                </Option>
                <Option value={UnitStatus.LOCKED}>
                  {UnitStatus.LOCKED.toUpperCase()}
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="unitType"
              label="Unit Type"
              rules={[
                {
                  required: true,
                  message: 'Please select a unit type'
                }
              ]}
            >
              <Select
                placeholder="Please select a unit type"
                disabled={Boolean(unit)}
              >
                <Option value={UnitType.TEST}>
                  {UnitType.TEST.toUpperCase()}
                </Option>
                <Option value={UnitType.PRODUCTION}>
                  {UnitType.PRODUCTION.toUpperCase()}
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="repository"
              label="Repository"
              rules={[{ required: true, message: 'Please enter repository' }]}
            >
              <AsyncSelect
                placeholder="Please enter repository"
                disabled={Boolean(unit)}
                onFetchListData={() => {
                  return fetchData<RepositoryResponse>(
                    [GetRepositories],
                    undefined,
                    {
                      method: 'get'
                    }
                  ).then(({ repositories }) => {
                    return repositories.map(repository => ({
                      label: repository.repositoryName,
                      value: repository.id
                    }));
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="branch"
              label="Branch"
              rules={[{ required: true, message: 'Please enter branch' }]}
            >
              <AsyncSelect
                placeholder="Please enter branch"
                onFetchListData={async () => {
                  const repositoryId = unit?.repository?.id ?? form.getFieldValue('repository');
                  if (!repositoryId) {
                    Modal.error({
                      title: 'error',
                      content: 'Please select a repository first'
                    });
                    return [];
                  }

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
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="buildFolder"
              label="Build Folder"
              rules={[{ required: true, message: 'Please enter build folder' }]}
            >
              <Input placeholder="Please enter build folder" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="buildScripts"
              label="Build Scripts"
              tooltip={{
                title: '多条 script 以 ; （英文逗号）隔开',
                color: '#4091F7'
              }}
              rules={[
                { required: true, message: 'Please enter build scripts' }
              ]}
            >
              <Input placeholder="Please enter build scripts" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="uploadTargetFolder"
              label="Upload Target Folder"
              rules={[
                { required: true, message: 'Please enter upload target folder' }
              ]}
            >
              <Input
                placeholder="Please enter upload target folder"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UnitForm;
