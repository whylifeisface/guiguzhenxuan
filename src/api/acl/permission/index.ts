import { request } from "@/utils/request";
import { hasPermissionResponse } from "@/api/acl/permission/type";
import { defaultResponse } from "@/api/product/spu/type";
import { PermissionNode } from "@/api/user/type";

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
