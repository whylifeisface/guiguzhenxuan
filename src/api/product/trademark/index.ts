import { request } from "@/utils/request.ts";
import {
  ResponseProduct,
  TradeMark,
  TradeMarkUpOrSaOrDel_Response,
} from "@/api/product/trademark/type.ts";

enum API {
  TRADEMARK_URL = "admin/product/baseTrademark/",
  ADD_TRADEMARK_URL = "admin/product/baseTrademark/save",
  UPDATE_TRADEMARK_URL = "admin/product/baseTrademark/update",
  DELETE_TRADEMARK_URL = "admin/product/baseTrademark/remove/",
}

// page 第几页  size 几个数据
export const reqHasTrademark = async (page: number, size: number) =>
  await request.get<never, ResponseProduct>(
    API.TRADEMARK_URL + `${page}/${size}`,
  );

// 是否带有id 有update
export const reqAddOrUpdateTradeMark = async (data: TradeMark) => {
  if (data.id)
    return await request.put<never, TradeMarkUpOrSaOrDel_Response>(
      API.UPDATE_TRADEMARK_URL,
      data,
    );
  else
    return await request.post<never, TradeMarkUpOrSaOrDel_Response>(
      API.ADD_TRADEMARK_URL,
      data,
    );
};
//删除已有品牌 根据id
export const reqDeleteTrademark = async (id: number) =>
  request.delete<never, TradeMarkUpOrSaOrDel_Response>(
    API.DELETE_TRADEMARK_URL + id,
  );
