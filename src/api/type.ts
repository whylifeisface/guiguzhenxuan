// 登录参数
export interface LoginFormData {
  username: string;
  password: string;
}

export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}
interface dataType {
  data?: string;
  message?: string;
}
//返回数据类型
export interface LoginResponseData extends ResponseData {
  data: string;
}
export interface LoginoutResponseData {
  code: number;
  data: dataType;
  message: string;
  ok: boolean;
}
export interface userInfoResponseData {
  routes: string[];
  buttons: string[];
  roles: string[];
  avatar: string;
  name: string;
}
// interface userInfo {
//   data: userInfoResponseData;
// }
// interface user {
//   checkUser: userInfo;
// }
export interface userResponseData {
  code: number;
  data: userInfoResponseData;
}
