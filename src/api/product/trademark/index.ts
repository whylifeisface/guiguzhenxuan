import { request } from "@/utils/request.ts";
import { ResponseProduct } from "@/api/product/trademark/type.ts";

enum API {
  TRADEMARK_URL = "admin/product/baseTrademark/",
}

// page 第几页  size 几个数据
export const reqHasTrademark = async (page: number, size: number) =>
  await request.get<any, ResponseProduct>(
    API.TRADEMARK_URL + `${page}/${size}`,
  );
