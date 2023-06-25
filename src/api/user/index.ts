import { request } from "@/utils/request.ts";
import {
  UserAssignResponseData,
  UserAssignSaveData,
  UserResponseData,
  UserType,
} from "@/api/user/type.ts";
import { defaultResponse } from "@/api/product/spu/type.ts";

enum API {
  HAS_USER = "/admin/acl/user/",

  UPDATE_USER = "/admin/acl/user/update",
  ADD_USER = "/admin/acl/user/save",
  USER_ASSIGN = "/admin/acl/user/toAssign/",
  SAVE_USER_ASSIGN = "/admin/acl/user/doAssignRole",
  DELETE_USER = "/admin/acl/user/remove/",
  DELETE_BATCH_USER = "/admin/acl/user/batchRemove",
}

export const SearchUser = (pageNo: number, pageSize: number, keyword: string) =>
  request.get<never, UserResponseData>(
    API.HAS_USER + `${pageNo}/${pageSize}/?username=${keyword}`,
  );

export const hasUser = (pageNo: number, pageSize: number) =>
  request.get<never, UserResponseData>(API.HAS_USER + `${pageNo}/${pageSize}`);
export const UpdateOrAddUser = (data: UserType) => {
  if (data.id)
    return request.put<never, defaultResponse>(API.UPDATE_USER, data);
  else return request.post<never, defaultResponse>(API.ADD_USER, data);
};
export const hasUserAssign = (adminId: number) =>
  request.get<never, UserAssignResponseData>(API.USER_ASSIGN + adminId);

export const SaveUserRole = (data: UserAssignSaveData) =>
  request.post<never, defaultResponse>(API.SAVE_USER_ASSIGN, data);
export const DeleteUser = (id: number) =>
  request.delete<never, defaultResponse>(API.DELETE_USER + id);

export const DeleteMultipleUserResponseData = (idList: number[]) =>
  request.delete<never, defaultResponse>(API.DELETE_BATCH_USER + idList);
