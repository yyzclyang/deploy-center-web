type UserRole =
  | 'super_admin'
  | 'admin'
  | 'major_deployer'
  | 'deployer'
  | 'tester'
  | 'guest';

interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  role: UserRole;
}

type RepositoryType = 'https' | 'ssh';

interface ReducerAction<T = string, K = any> {
  type: T;
  payload: K;
}
