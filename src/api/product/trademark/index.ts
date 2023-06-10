import { request } from "@/utils/request.ts";

enum API {
  TRADEMARK_URL = "admin/product/baseTrademark/",
}
// page 第几页  size 几个数据
export const reqHasTrademark = (page: number, size: number) => {
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${size}`);
};
