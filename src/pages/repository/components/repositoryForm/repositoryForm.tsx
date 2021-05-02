import { FC } from 'react';
import { Col, Modal, Form, Input, Row, Select } from 'antd';
import { RepositoryType } from '@/utils/varible';
import { RepositoryData, RepositoryFormValues } from '../../types';

const { Option } = Select;

interface EditRepositoryProps {
  repository?: RepositoryData;
  title: string;
  visible: boolean;
  onSubmit: (values: RepositoryFormValues) => Promise<void>;
  onClose: () => void;
}

const RepositoryForm: FC<EditRepositoryProps> = props => {
  const { title, visible, repository } = props;
  const [form] = Form.useForm();

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    return form
      .validateFields()
      .then((values: RepositoryFormValues) => {
        return props.onSubmit(values).then(() => {
          form.resetFields();
        });
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
      <Form form={form} layout="vertical" initialValues={repository}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="repositoryName"
              label="Repository Name"
              rules={[
                { required: true, message: 'Please enter repository name' }
              ]}
            >
              <Input placeholder="Please enter repository name" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="repositoryType"
              label="Repository Type"
              rules={[
                {
                  required: true,
                  message: 'Please select a repository type'
                }
              ]}
            >
              <Select placeholder="Please select a repository type">
                <Option value={RepositoryType.HTTPS}>
                  {RepositoryType.HTTPS.toUpperCase()}
                </Option>
                <Option value={RepositoryType.SSH}>
                  {RepositoryType.SSH.toUpperCase()}
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="repositoryUrl"
              label="Repository Url"
              rules={[
                { required: true, message: 'Please enter repository url' }
              ]}
            >
              <Input placeholder="Please enter repository url" allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RepositoryForm;
