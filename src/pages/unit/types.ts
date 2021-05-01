import { UnitStatus, UnitType } from '@/utils/varible';

export interface BranchesInfo {
  branches: Array<BranchInfo>;
}

export interface UnitData {
  id: string;
  index: number;
  unitName: string;
  unitStatus: UnitStatus;
  unitType: UnitType;
  repository: RepositoryInfo;
  branch: string;
  repositoryFolder: string;
  buildFolder: string;
  buildScripts: string[];
  resourceZipFolder: string;
  uploadTargetFolder: string;
  creator: UserInfo;
  updater: UserInfo;
  createAt: Date;
  updateAt: Date;
}

export interface UnitFormOriginValues {
  unitName: string;
  unitStatus: UnitStatus;
  unitType: UnitType;
  repository: string;
  branch: string;
  buildFolder: string;
  buildScripts: string;
  uploadTargetFolder: string;
}
export interface UnitFormValues {
  unitName: string;
  unitStatus: UnitStatus;
  unitType: UnitType;
  repositoryId: string;
  branch: string;
  buildFolder: string;
  buildScripts: string[];
  uploadTargetFolder: string;
}
