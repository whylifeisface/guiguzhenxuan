import { request } from "@/utils/request.ts";
import { hasPermissionResponse } from "@/api/acl/permission/type.ts";
import { defaultResponse } from "@/api/product/spu/type.ts";
import { PermissionNode } from "@/api/user/type.ts";

enum API {
  GET_PERMISSION = "/admin/acl/permission",
  ADD_PERMISSION = "/admin/acl/permission/save",
  DELETE_PERMISSION = "/admin/acl/permission/remove/",
}

export const hasPermissionResponseData = () =>
  request.get<never, hasPermissionResponse>(API.GET_PERMISSION);
export const AddPermissionResponseData = (data: PermissionNode) =>
  request.post<never, defaultResponse>(API.ADD_PERMISSION, data);
export const DeletePermissionResponseData = (id: number) =>
  request.delete<never, defaultResponse>(API.DELETE_PERMISSION + id);
