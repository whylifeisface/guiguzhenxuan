import { request } from "@/utils/request.ts";
import { ResponseProduct, TradeMark } from "@/api/product/trademark/type.ts";

enum API {
  TRADEMARK_URL = "admin/product/baseTrademark/",
  ADD_TRADEMARK_URL = "admin/product/baseTrademark/save",
  UPDATE_TRADEMARK_URL = "admin/product/baseTrademark/update",
}

// page 第几页  size 几个数据
export const reqHasTrademark = async (page: number, size: number) =>
  await request.get<any, ResponseProduct>(
    API.TRADEMARK_URL + `${page}/${size}`,
  );

// 是否带有id 有update
export const reqAddOrUpdateTradeMark = async (data: TradeMark) => {
  if (data.id)
    return await request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
  else return await request.post<any, any>(API.ADD_TRADEMARK_URL, data);
};
