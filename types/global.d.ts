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
interface RepositoryInfo {
  id: string;
  repositoryName: string;
  repositoryType: ResponseType;
  repositoryUrl: string;
}
interface BranchInfo {
  branch: string;
  commit: string;
}

type RepositoryType = 'https' | 'ssh';

interface ReducerAction<T = string, K = any> {
  type: T;
  payload: K;
}
