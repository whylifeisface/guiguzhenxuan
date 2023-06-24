import { request } from "@/utils/request.ts";
import { UserResponseData, UserType } from "@/api/user/type.ts";
import { defaultResponse } from "@/api/product/spu/type.ts";

enum API {
  HAS_USER = "/admin/acl/user/",

  UPDATE_USER = "/admin/acl/user/update",
  ADD_USER = "/admin/acl/user/save"
}
export const hasUser = (pageNo: number, pageSize: number) =>
  request.get<never, UserResponseData>(API.HAS_USER + `${pageNo}/${pageSize}`);
export const UpdateOrAddUser = (data: UserType) => {
  if (data.id)
    return request.put<never, defaultResponse>(API.UPDATE_USER, data);
  else return request.post<never, defaultResponse>(API.ADD_USER, data);
};
