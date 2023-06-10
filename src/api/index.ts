import { request } from "@/utils/request";
import type {
  LoginFormData,
  LoginoutResponseData,
  LoginResponseData,
  userResponseData,
} from "./type";
enum API {
  LOGIN_URL = "admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL);
export const reqLogout = () =>
  request.post<any, LoginoutResponseData>(API.LOGOUT_URL);
