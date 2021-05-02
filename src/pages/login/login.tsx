import { FC, useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import localStorageUtil from '@/utils/localStorageUtil';
import fetchData from '@/utils/request/fetchData';
import { LoginApi } from '@/utils/request/apiConfigCenter';
import history from '@/utils/history';
import { GlobalContext } from '@/store';
import styles from './login.module.scss';

interface LoginFormValue {
  username: string;
  password: string;
  remember: boolean;
}

interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

const Login: FC = () => {
  const { dispatch } = useContext(GlobalContext);

  const onLogin = (values: LoginFormValue) => {
    const { username, password, remember } = values;
    fetchData<LoginResult>([LoginApi], { username, password }).then(res => {
      if (remember) {
        localStorageUtil.set('__LOGIN_INFO__', res);
      }

      const { token, userInfo } = res;
      dispatch({ type: 'CHANGE_TOKEN', payload: token });
      dispatch({ type: 'CHANGE_USER_INFO', payload: userInfo });

      history.push('/home');
      return res;
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles['login-box']}>
          <p className={styles.title}>Deploy Center</p>

          <Form
            name="normal_login"
            className={styles['login-form']}
            initialValues={{ remember: true }}
            onFinish={onLogin}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' }
              ]}
            >
              <Input
                prefix={
                  <UserOutlined className={styles['site-form-item-icon']} />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' }
              ]}
            >
              <Input
                prefix={
                  <LockOutlined className={styles['site-form-item-icon']} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles['login-form-button']}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <footer className={styles.footer}>
        <a
          className={styles.link}
          href="https://www.beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          ICP许可证号 粤ICP备19127738号
        </a>
      </footer>
    </div>
  );
};

export default Login;
