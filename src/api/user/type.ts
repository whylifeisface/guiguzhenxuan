import { ResponseData } from "@/api/product/attr/type.ts";

export interface UserResponseData extends ResponseData {
  data: {
    records: UserType[];
    total: number;
    size: number;
    current: number;
    searchCount: true;
    pages: number;
  };
}
export interface UserType {
  id: number;
  username: string;
  passwd: string;
  name: string;
  phone: null;
  createTime: string;
  updateTime: string;
  roleName: string;
}
