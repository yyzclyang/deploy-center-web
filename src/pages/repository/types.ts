import { RepositoryType } from '@/utils/varible';

export interface RepositoryData {
  id: string;
  index: number;
  repositoryName: string;
  repositoryType: RepositoryType;
  repositoryUrl: string;
  creator: UserInfo;
  updater: UserInfo;
  createAt: Date;
  updateAt: Date;
}

export interface RepositoryResponse {
  repositories: Array<RepositoryData>;
}

export interface RepositoryFormValues {
  repositoryName: string;
  repositoryType: RepositoryType;
  repositoryUrl: string;
}
