import { UnitData } from '@/pages/unit/types';
import { RepositoryData } from '@/pages/repository/types';
import { TaskStatus } from '@/utils/varible';

export interface TaskData {
  id: string;
  index: number;
  repository: RepositoryData;
  unit: UnitData;
  commit: string;
  taskStatus: TaskStatus;
  resourceZipUrl?: string;
  taskStartAt?: Date;
  taskFinishAt?: Date;
  taskTimeSpent?: number;
  fetchCodeStartAt?: Date;
  fetchCodeFinishAt?: Date;
  fetchCodeTimeSpent?: number;
  buildStartAt?: Date;
  buildFinishAt?: Date;
  buildTimeSpent?: number;
  uploadStartAt?: Date;
  uploadFinishAt?: Date;
  uploadTimeSpent?: number;
  uploadFileCounts?: number;
  creator: UserInfo;
  createAt: Date;
  updateAt: Date;
}

export interface TasksRepository {
  tasks: Array<TaskData>;
}
