import { request } from "@/utils/request.ts";
import { UserResponseData } from "@/api/user/type.ts";

enum API {
  HAS_USER = "/admin/acl/user/",
}
export const hasUser = (pageNo: number, pageSize: number) =>
  request.get<never, UserResponseData>(API.HAS_USER + `${pageNo}/${pageSize}`);
