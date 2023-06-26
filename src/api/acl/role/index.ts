import { request } from "@/utils/request.ts";
import { RoleListResponseData } from "@/api/acl/role/type.ts";
import { Role } from "@/api/user/type.ts";
import { defaultResponse } from "@/api/product/spu/type.ts";

enum API {
  ROLE_LIST = "/admin/acl/role/",
  UPDATE_ROLE = "/admin/acl/role/update",
  SAVE_ROLE = "/admin/acl/role/save",
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
