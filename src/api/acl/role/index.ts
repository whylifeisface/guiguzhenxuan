import { request } from "@/utils/request";
import { RoleListResponseData } from "@/api/acl/role/type";
import { PermissionListResponseData, Role } from "@/api/user/type";
import { defaultResponse } from "@/api/product/spu/type";

enum API {
  ROLE_LIST = "/admin/acl/role/",
  UPDATE_ROLE = "/admin/acl/role/update",
  SAVE_ROLE = "/admin/acl/role/save",
  DELETE_ROLE_ID = "/admin/acl/role/remove/",
  //菜单管理 通过id获取角色菜单
  USER_ROLE_PERMISSION = "/admin/acl/permission/toAssign/",
  ROEL_ASSIGN = "/admin/acl/permission/doAssign/?",
}
export const hasRoleResponseData = (pageNum: number, pageSize: number) =>
  request.get<never, RoleListResponseData>(
    API.ROLE_LIST + `${pageNum}/${pageSize}`,
  );
export const searchRoleResponseData = (
  pageNum: number,
  pageSize: number,
  keyword: string,
) =>
  request.get<never, RoleListResponseData>(
    API.ROLE_LIST + `${pageNum}/${pageSize}?roleName=${keyword}`,
  );
export const UpdateRoleResponseData = (data: Role) =>
  request.put<never, defaultResponse>(API.UPDATE_ROLE, data);
export const SaveRoleResponseData = (data: Role) =>
  request.post<never, defaultResponse>(API.SAVE_ROLE, data);
export const PermissionListResponse = (id: number) =>
  request.get<never, PermissionListResponseData>(API.USER_ROLE_PERMISSION + id);

export const DeleteRoleRoleResponseData = (id: number) =>
  request.delete<never, defaultResponse>(API.DELETE_ROLE_ID + id);
export const RoleAssignResponse = (id: number, roleId: number[]) =>
  request.post<never, defaultResponse>(
    API.ROEL_ASSIGN + `roleId=${id}&permissionId=${roleId}`,
  );
