import { ResponseData } from "@/api/product/attr/type.ts";

export interface UserResponseData extends ResponseData {
  data: {
    records: UserType[];
    total: number;
    size: number;
    current: number;
    searchCount: true;
    pages: number;
  };
}
export interface UserType {
  id?: number;
  username: string;
  password: string;
  name: string;
  phone: null;
  createTime: string;
  updateTime: string;
  roleName: string;
}
export interface UserAssignResponseData extends ResponseData {
  data: UserAssign;
}
export interface Role {
  id?: number;
  createTime: string;
  updateTime: string;
  roleName: string;
  remark: null;
}
export interface UserAssign {
  assignRoles: Role[];
  allRolesList: Role[];
}
export interface UserAssignSaveData {
  roleIdList: number[];
  userId: number;
}
export interface PermissionListResponseData extends ResponseData {
  data: PermissionNode[];
}
export interface PermissionNode {
  id: number;
  label?: string;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: null;
  toCode: null;
  type: number;
  status: null;
  level: number;
  select?: boolean;
  children: PermissionNode[];
}
