import { request } from "@/utils/request";
import type {
  LoginFormData,
  LoginoutResponseData,
  userResponseData,
} from "./type";
enum API {
  LOGIN_URL = "admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
export const reqLogin = (data: LoginFormData) =>
  request.post<never, userResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () =>
  request.get<never, userResponseData>(API.USERINFO_URL);
export const reqLogout = () =>
  request.post<never, LoginoutResponseData>(API.LOGOUT_URL);
