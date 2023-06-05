// 登录参数
export interface LoginForm {
  username: string;
  password: string;
}
interface dataType {
  token?: string;
  message?: string;
}
//返回数据类型
export interface LoginResponseData {
  code: number;
  data: dataType;
}
interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
interface user {
  checkUser: userInfo;
}
export interface userResponseData {
  code: number;
  data: user;
}
